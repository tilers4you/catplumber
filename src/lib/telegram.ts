export interface ContactFormData {
  name: string;
  phone: string;
  email: string;
  service?: string;
  area?: string;
  message: string;
  source?: string;
}

interface TelegramResponse {
  ok: boolean;
  description?: string;
}

function escapeMarkdown(text: string): string {
  // Escape special characters for Telegram MarkdownV2
  return text.replace(/[_*[\]()~`>#+=|{}.!\\-]/g, (char) => `\\${char}`);
}

function formatMessage(data: ContactFormData): string {
  const lines: string[] = [
    `*New Lead — ${escapeMarkdown(data.name)}*`,
    "",
    `*Phone:* ${escapeMarkdown(data.phone)}`,
    `*Email:* ${escapeMarkdown(data.email)}`,
  ];

  if (data.service) {
    lines.push(`*Service:* ${escapeMarkdown(data.service)}`);
  }

  if (data.area) {
    lines.push(`*Area:* ${escapeMarkdown(data.area)}`);
  }

  lines.push("", `*Message:*`, escapeMarkdown(data.message));

  if (data.source) {
    lines.push("", `_Source: ${escapeMarkdown(data.source)}_`);
  }

  lines.push(`_Submitted: ${escapeMarkdown(new Date().toLocaleString("en-US", { timeZone: "America/Denver" }))}_`);

  return lines.join("\n");
}

export async function sendTelegramMessage(
  data: ContactFormData,
): Promise<void> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    throw new Error(
      "Missing TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID environment variables.",
    );
  }

  const url = `https://api.telegram.org/bot${token}/sendMessage`;
  const body = JSON.stringify({
    chat_id: chatId,
    text: formatMessage(data),
    parse_mode: "MarkdownV2",
    disable_web_page_preview: true,
  });

  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body,
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(
      `Telegram API error ${response.status}: ${errorText}`,
    );
  }

  const result = (await response.json()) as TelegramResponse;

  if (!result.ok) {
    throw new Error(
      `Telegram API returned not-ok: ${result.description ?? "unknown error"}`,
    );
  }
}

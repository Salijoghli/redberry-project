type Method = "POST" | "GET";

const TOKEN =
  "db43105a7d86b634dcc5be24ec37dfdc939473ad75ee98cd4904659298c9b4b4";

export const request =
  (method: Method) =>
  async <T>(path: string, body?: Record<string, unknown>): Promise<T> => {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${TOKEN}`,
    };

    if (method === "GET") {
      delete headers["Content-Type"];
    } else {
      headers.authorization = `Bearer ${TOKEN}`;
    }

    const result = await fetch(path, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
    });

    if (!result.ok) {
      throw new Error(`Request failed with status: ${result.status}`);
    }

    const data = await result.json();

    return data as T;
  };

export const get = request("GET");
export const post = request("POST");

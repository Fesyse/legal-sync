import { client } from "./setup";

export async function Req() {
  client
    .chat({
      messages: [{ role: "user", content: "Привет, как дела?" }],
    })
    .then((resp) => {
      console.log(resp.choices[0]?.message.content);
    });
}

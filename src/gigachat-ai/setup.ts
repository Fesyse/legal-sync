import GigaChat from "gigachat";
import { Agent } from "node:https";

const httpsAgent = new Agent({
  rejectUnauthorized: false,
});

export const client = new GigaChat({
  timeout: 600,
  model: "GigaChat",
  credentials:
    "NGViMzk4ZGMtNTdhYS00MWU1LTkzM2MtMDlmMGE0NmMyODZkOmQ5YjExMTYyLWRjMDEtNDhjZi1iOTRhLThlODE0M2YwMDQ5Yg==",
  httpsAgent: httpsAgent,
});

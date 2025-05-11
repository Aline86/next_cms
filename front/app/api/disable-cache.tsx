import { NextApiRequest, NextApiResponse } from "next";

interface ResponseData {
  message: string;
}

export default function handler(
  _: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  res.setHeader("Cache-Control", "no-store, must-revalidate");
  res.setHeader("Pragma", "no-cache");
  res.setHeader("Expires", "0");
  res.status(200).json({ message: "Cache disabled" });
}

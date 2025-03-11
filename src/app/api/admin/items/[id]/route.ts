import { NextRequest } from "next/server";

export async function GET(
  req: NextRequest,
  info: { params: Promise<{ id: number }> }
) {
  const searchParams = new URL(req.url).searchParams;

  const { id } = await info?.params;
  const page = searchParams.get("page");
  const limit = searchParams.get("limit");

  return new Response(
    `
      <p style="color:green"> Your item ID is ${id} </p>
      <p style="color:green"> Your Page number is ${page} </p>
      <p style="color:green"> Your Limit is ${limit} </p>     
    `,
    {
      headers: {
        "Content-type": "html",
      },
    }
  );
}

import { ClientServerConnections, db } from "astro:db";
import fetchIPData from "../../../services/fetch/postiplocator";

export const POST = async (request: any) => {
  try {
    const { clientAddress } = request;
    let result: any = {
      data: "undefined" as string | typeof clientServerConnection,
      table: "ClientServerConnections" as string,
      count: 0,
    };
    let clientServerConnection;
    const date = new Date();

    console.log(clientAddress);

    const insertQuery = async (local: string) => {
      return db
        .insert(ClientServerConnections)
        .values(clientAddress)
        .onConflictDoUpdate({
          target: ClientServerConnections.id,
          set: {
            server_nick: "server1",
            estimated_client_location: local,
            device_type: "smartphone",
            file_download: "https://example.com/file.pdf",
            created_at: date,
            client_IP: clientAddress,
          },
        });
    };
    fetchIPData(clientAddress)
      .then(() => insertQuery(clientAddress))
      .catch((error) => console.log('error'));
    return new Response(JSON.stringify({ result }), {
      status: 200,
      headers: {
        "content-type": "application/json",
      },
    });
  } catch (error) {
  //@ts-ignore
    return new Response(JSON.stringify({ error: error.message }), {
      status: 200,
      headers: {
        "content-type": "application/json",
      },
    });
  }
};

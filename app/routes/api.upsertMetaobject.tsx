import type { ActionFunctionArgs} from "@remix-run/node";
import { UpsertMetaobject } from "~/graphql/admin/UpsertMetaobject";

export async function action({ request,context }: ActionFunctionArgs) {
    const { admin } = context;
    const data:any = await request.json()

  const response = await admin.request(UpsertMetaobject, {
    variables: {
        "handle": data.handle,
        "metaobject": data.metaobject
      },
  });

  return response;

}

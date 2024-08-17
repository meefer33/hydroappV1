import type { ActionFunctionArgs} from "@remix-run/node";
import { UpdateMetaobject } from "~/graphql/admin/UpdateMetaobject";


export async function action({ request,context }: ActionFunctionArgs) {
    const { admin } = context;
    const data:any = await request.json()
    console.log(data)

  const response = await admin.request(UpdateMetaobject, {
    variables: {
        "id": data.id,
        "metaobject": data.metaobject
      },
  });

 
  return response

}

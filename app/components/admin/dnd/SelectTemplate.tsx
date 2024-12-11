import FieldsGroup from './fields/FieldsGroup';
import {Link, useOutletContext} from '@remix-run/react';

export default function SelectTemplate() {
  const {templates}: any = useOutletContext();

  return (
    <FieldsGroup label="Choose Template" isOpen={false}>
      {templates?.map((template: any) => {
        return (
          <Link
            key={template.handle}
            to={`/templates/${template.handle}`}
            reloadDocument
          >
            {template.handle}
          </Link>
        );
      })}
    </FieldsGroup>
  );
}

import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Select } from "../ui/select";
import { Textarea } from "../ui/textarea";

export function FormFields({ formFields = [], formData = {}, setFormData }) {
  const ElementByType = ({ item }) => {
    const currentItemValue = formData[item.name] || "";
    let element = null;
    switch (item.componentType) {
      case "input":
        element = (
          <Input
            id={item.name}
            type={item.type}
            placeholder={item.placeholder}
            value={currentItemValue}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, [item.name]: e.target.value }))
            }
          />
        );
        break;
      case "textarea":
        element = (
          <Textarea
            id={item.name}
            value={currentItemValue}
            onChange={(e) =>
              setFormData({ ...formData, [item.name]: e.target.value })
            }
          />
        );
        break;
      //update in future
      // case "select":
      //   element = <Select></Select>;
      //   break;

      default:
        element = (
          <Input
            id={item.name}
            type={item.type}
            placeholder={item.placeholder}
            value={currentItemValue}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, [item.name]: e.target.value }))
            }
          />
        );
        break;
    }

    return element;
  };

  return (
    <div className="flex flex-col gap-3">
      {formFields.map((item) => (
        <div key={item.name}>
          <Label htmlFor={item.name}>{item.lable}</Label>
          <ElementByType item={item} />
        </div>
      ))}
    </div>
  );
}

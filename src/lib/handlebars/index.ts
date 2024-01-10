import Handlebars from "handlebars";
import { activationTemplate } from "../email-templates/activation";

export function compileTemplate(
  name: string,
  url: string,
  template: string | undefined
) {
  const compiledTemplate = Handlebars.compile(template);

  const htmlBody = compiledTemplate({
    name,
    url,
  });

  return htmlBody;
}

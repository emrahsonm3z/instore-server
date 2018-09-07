import * as Yup from "yup";

import { PROVIDER_ENUM } from "./customer.model";
import { AuthProvider } from "../../services/authProvider";
import { getOrCreateCustomer } from "./customer";
import { AuthServices } from "../../services/Auth";

export const create = async (req, res) => {
  const { token, provider } = req.body;

  const bodySchema = Yup.object().shape({
    token: Yup.string().required(),
    provider: Yup.string()
      .oneOf(PROVIDER_ENUM)
      .required()
  });

  try {
    await bodySchema.validate({ token, provider });

    let data;
    switch (provider) {
      case "FACEBOOK":
        data = await AuthProvider.Facebook.authAsync(token);
        break;
      case "GOOGLE":
        data = await AuthProvider.Google.authAsync(token);
        break;
      default:
        res.sendStatus(400);
        break;
    }
    const customer = await getOrCreateCustomer(data, provider);

    const jwtToken = AuthServices.createToken(customer);
    res.status(201).json({ token: jwtToken });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

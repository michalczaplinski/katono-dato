import axios from "axios";
import config from "../config";

const api = {
  sendEmailToCustomer(data, total, items) {
    return axios({
      method: "POST",
      url: `${config.API_URL}/send_mail`,
      headers: {
        "Content-Type": "application/json",
        "x-api-key": config.API_KEY
      },
      data: {
        from: "katono.clothing@gmail.com",
        to: data.email,
        subject: "Your order from Katono.clothing!",
        template: "welcome",
        context: {
          first_name: data.firstName,
          last_name: data.lastName,
          total,
          items: items.map(({ node: item }) => ({
            ...item,
            imageURL: item.coverImage.sizes.src
          }))
        }
      }
    });
  },

  sendEmailToSelf(data, total, items) {
    return axios({
      method: "POST",
      url: `${config.API_URL}/send_mail`,
      headers: {
        "Content-Type": "application/json",
        "x-api-key": config.API_KEY
      },
      data: {
        from: "katono.clothing@gmail.com",
        to: "katono.clothing@gmail.com",
        subject: `Order from ${data.firstName} ${data.lastName}`,
        template: "order",
        context: {
          first_name: data.firstName,
          last_name: data.lastName,
          email: data.email,
          tel: data.tel,
          deliveryType: data.deliveryType,
          address: data.address || null,
          total,
          items: items.map(({ node: item }) => ({
            ...item,
            imageURL: item.coverImage.sizes.src
          }))
        }
      }
    });
  },

  removeItemFromCMS(items) {
    return axios({
      method: "POST",
      url: `${config.API_URL}/update`,
      headers: {
        "Content-Type": "application/json",
        "x-api-key": config.API_KEY
      },
      data: {
        items: items.map(({ node: item }) => ({
          ...item,
          id: item.id.match(/(\d+)/)[0],
          imageURL: item.coverImage.sizes.src
        }))
      }
    });
  },

  rebuildSite() {
    return axios.post(
      "https://api.netlify.com/build_hooks/5a6e32ce92226a2fe7ca845a"
    );
  }
};

export default api;

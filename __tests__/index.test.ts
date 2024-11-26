import Stripe from "stripe";
import { config } from "dotenv";
config();

var stripe: Stripe | any;

var customerId = "",
  productId = "",
  priceId = "",
  recurringPriceId = "",
  invoiceId = "",
  subscriptionId = "",
  accountId = "",
  accountLink = "",
  EMAIL = "";

beforeAll(() => {
  stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
  EMAIL = "devduttsinh.chudasama@simformsolutions.com";
});

describe("Stripe Module", () => {
  test("create customer", async () => {
    try {
      const customer = await stripe.customers.create({
        email: EMAIL,
        name: "dev simform",
      });

      customerId = customer.id;
      expect(customerId).toBeTruthy();
    } catch (error) {
      console.log(error);
    }
  }, 20000);

  test("create product object", async () => {
    const product = await stripe.products.create({
      name: "PROD-1",
    });

    productId = product.id;
    expect(productId).toBeTruthy();
  }, 20000);

  test("create price object linked to product", async () => {
    const price = await stripe.prices.create({
      currency: "usd",
      active: true,
      product: productId,
      unit_amount: 1000,
    });

    priceId = price.id;
    expect(priceId).toBeTruthy();
  }, 20000);

  test("create recurring price", async () => {
    const price = await stripe.prices.create({
      recurring: {
        interval: "day",
        interval_count: 1,
        usage_type: "licensed",
      },
      product: productId,
      unit_amount: 100,
      currency: "usd",
    });

    recurringPriceId = price.id;
    expect(priceId).toBeTruthy();
  }, 20000);

  test("create invoice", async () => {
    const invoice = await stripe.invoices.create({
      customer: customerId,
      due_date: Number((Date.now() / 1000).toFixed(0)) + 20000,
      collection_method: "send_invoice",
    });

    invoiceId = invoice.id;
    expect(invoiceId).toBeTruthy();
  }, 20000);

  test("add invoice items", async () => {
    let item = await stripe.invoiceItems.create({
      invoice: invoiceId,
      customer: customerId,
      price: priceId,
    });

    expect(item.invoice?.toString()).toEqual(invoiceId);
  }, 20000);

  test("create subscription", async () => {
    const subscription = await stripe.subscriptions.create({
      customer: customerId,
      items: [{ price: recurringPriceId, quantity: 1 }],
      trial_period_days: 1,
    });

    subscriptionId = subscription.id;
    expect(subscriptionId).toBeTruthy();
  }, 20000);

  test("create connected account", async () => {
    const account = await stripe.accounts.create({
      email: EMAIL,
      country: "US",
      controller: {
        stripe_dashboard: {
          type: "express",
        },
        fees: {
          payer: "application",
        },
        losses: {
          payments: "application",
        },
      },
      business_type: "individual",
      individual: { email: EMAIL, first_name: "dev", last_name: "simform" },
    });

    accountId = account.id;
    expect(accountId).toBeTruthy();
  }, 20000);

  test("create account link for customer to setup account", async () => {
    const accountLinkObject = await stripe.accountLinks.create({
      account: accountId,
      type: "account_onboarding",
      refresh_url: "https://mirror.com",
      return_url: "https://mirror.com",
    });

    accountLink = accountLinkObject.url;
    expect(accountLink).toBeTruthy();
  }, 20000);

  afterAll(async () => {
    try {
      const queue: unknown[] = [];

      if (accountId) {
        queue.push(stripe.accounts.del(accountId));
      }

      if (subscriptionId) {
        queue.push(
          stripe.subscriptions.cancel(subscriptionId, {
            cancellation_details: { comment: "From test suit" },
          })
        );
      }

      if (invoiceId) {
        queue.push(stripe.invoices.del(invoiceId));
      }

      if (recurringPriceId) {
        queue.push(
          stripe.prices.update(recurringPriceId, {
            active: false,
          })
        );
      }

      if (priceId) {
        queue.push(
          stripe.prices.update(priceId, {
            active: false,
          })
        );
      }

      if (productId) {
        queue.push(stripe.products.del(productId));
      }

      if (customerId) {
        queue.push(stripe.customers.del(customerId));
      }

      const result = await Promise.allSettled(queue);

      for (let done of result) {
        console.log("done: ", done.status);
      }
    } catch (error) {
      console.log(error);
    }

    console.log(
      `customerId: ${customerId}`,
      `productId: ${productId}`,
      `priceId: ${priceId}`,
      `recurringPriceId: ${recurringPriceId}`,
      `invoiceId: ${invoiceId}`,
      `subscriptionId: ${subscriptionId}`,
      `accountId: ${accountId}`,
      `accountLink: ${accountLink}`
    );
  });
});

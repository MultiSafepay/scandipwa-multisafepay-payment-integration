<p align="center">
  <img src="https://www.multisafepay.com/img/multisafepaylogo.svg" width="400px" position="center">
</p>

<p align="center">
  <img src="https://user-images.githubusercontent.com/29531824/104035590-fc25fb00-51da-11eb-9171-d5f2e9211753.png" width="350px" position="center">
</p>

# ScandiPWA theme

MultiSafepay's frontend integration for ScandiPWA 4.x theme with Magento 2 plugin as backend system.

## About MultiSafepay

MultiSafepay is a collecting payment service provider, which means we take care of electronic contracts, technical details, and payment collection for each payment method. You can start selling online today and manage all your transactions in one place.

## Supported payment methods 

See [ScandiPWA](https://docs.multisafepay.com/docs/scandipwa) > Payment methods. 

## Prerequisites

- You will need a [MultiSafepay account](https://testmerchant.multisafepay.com/signup). Consider a test account first.
- To support GraphQL queries, install the [MultiSafepay Magento 2 GraphQL](https://github.com/MultiSafepay/magento2-graphql) plugin.
- You must also meet ScandiPWA and Magento requirements. See ScandiPWA – [Prerequisites](https://docs.scandipwa.com/getting-started/getting-started/magento-integration#prerequisites).
- [Open software license (OSL 3.0)](https://github.com/MultiSafepay/Magento2Msp/blob/master/LICENSE.md)

## Installation

1. Install the MultiSafepay plugin for supporting GraphQL queries, which also installs the MultiSafepay Core, Frontend and Adminhtml plugins. For instructions, see MultiSafepay Github <a href="https://github.com/MultiSafepay/magento2-graphql" target="_blank">Magento 2 GraphQL</a>.    
2. Configure the payment methods and your API keys in the Magento admin panel.  
3. To configure URLs to your success and cancellation pages, go to **Stores** > **Configuration** > **MultiSafepay** > **General settings** > **Advanced settings** > **Use custom return urls for PWA storefront integration**.
    - For the **Custom redirect URL after canceling the payment**, we recommend using: {{store.secure_base_url}}cart
    - For the **Custom success page url**, we recommend using: {{store.secure_base_url}}checkout/success?incrementId={{order.increment_id}}&paymentCode={{payment.code}}
4. Install the ScandiPWA frontend plugin from this repository into your ScandiPWA theme. For instructions, see ScandiPWA - <a href="https://docs.scandipwa.com/stack/extensions/installing-an-extension" target="_blank">Installing an extension</a>.
5. Explore the checkout in your ScandiPWA application:  
<img width="1000" alt="Screenshot 2021-03-12 at 12 56 42" src="https://user-images.githubusercontent.com/78361324/110949265-b0124680-8342-11eb-8d99-55c926e76f3d.png">

## Support

- Create an issue on this repository. 
- Email <a href="mailto:integration@multisafepay.com">integration@multisafepay.com</a>
- Start a conversation on our Magento Slack channel [#multisafepay-payments](https://magentocommeng.slack.com/messages/multisafepay-payments/).

## Contributors

If you see an opportunity to make an improvement, we invite you to create a pull request, create an issue, or email <integration@multisafepay.com> 

As a thank you for your contribution, we'll send you a MultiSafepay t-shirt, making you part of the team!

## Want to be part of the team?

Are you a developer interested in working at MultiSafepay? Check out our [job openings](https://www.multisafepay.com/careers/#jobopenings) and feel free to get in touch!

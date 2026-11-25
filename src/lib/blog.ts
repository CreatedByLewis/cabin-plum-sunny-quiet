// Blog posts. Body blocks are plain data so the same content feeds the page,
// the structured data, the sitemap and llms.txt.
// Inline text supports **bold** and [links](/path) only.

export type Block =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "list"; items: string[] }
  | { type: "table"; head: string[]; rows: string[][]; caption?: string }
  | { type: "callout"; title: string; text: string };

export type Post = {
  slug: string;
  title: string;
  description: string;
  published: string; // ISO date
  updated: string;
  readingMinutes: number;
  tags: string[];
  lede: string;
  body: Block[];
  sources: { label: string; url: string }[];
};

export const posts: Post[] = [
  {
    slug: "google-business-profile-guide",
    title: "Google Business Profile: A Complete Guide for Local Businesses",
    description:
      "A plain guide to Google Business Profile for UK local businesses: who qualifies, set-up, verification, service areas, reviews and how to rank on the map.",
    published: "2026-11-25",
    updated: "2026-11-25",
    readingMinutes: 9,
    tags: ["Local SEO", "Google", "Small Business", "Marketing", "Food Business"],
    lede: "When someone nearby searches for what you do, the first thing they often see isn’t a website at all. It’s a map with three businesses underneath it, each with a star rating, opening hours and a button to call or get directions. That listing is your Google Business Profile. It’s free, it takes an afternoon to set up properly, and for a lot of local businesses it brings in more enquiries than anything else online. This is how to get it right.",
    body: [
      { type: "h2", text: "The Quick Answer" },
      {
        type: "p",
        text: "A Google Business Profile is the free listing that shows your business on Google Search and Google Maps. If you serve customers face to face, at your premises or at theirs, you should almost certainly have one. The short version of doing it well:",
      },
      {
        type: "list",
        items: [
          "**Check you’re eligible.** Google wants businesses that meet customers in person during their stated hours.",
          "**Claim or create your profile** using the business’s own Google Account, not one belonging to a designer or agency.",
          "**Verify it.** Google picks the method, often a short video, and review can take up to five business days.",
          "**Fill in everything**: the right category, accurate hours, your service area, photos and a link to your website.",
          "**Ask every happy customer for a review**, and reply to the ones you get, good and bad.",
          "**Keep it current.** Holiday hours, new products and fresh photos all tell Google and customers that you’re open and active.",
        ],
      },

      { type: "h2", text: "What a Google Business Profile Actually Does" },
      {
        type: "p",
        text: "Your profile is the information panel Google shows about your business. It appears when someone searches your name, and it can also appear in the map results when someone searches for something like “meal prep near me” or “bakery in Whitley Bay”. From there people can call you, get directions, read reviews, see photos, check whether you’re open and click through to your website.",
      },
      {
        type: "p",
        text: "A profile is brilliant at getting you noticed, but it can’t take an order, check a delivery postcode or sell a subscription. The best set-ups treat the profile as the shop window and the website as the shop. If the window is great and the shop is hard to use, you lose the sale at the door.",
      },

      { type: "h2", text: "Are You Eligible?" },
      {
        type: "p",
        text: "This catches people out more than anything else. Google’s eligibility guidelines say a business needs to make in-person contact with customers during the hours it lists. In practice, that splits businesses into three types:",
      },
      {
        type: "table",
        caption: "Based on Google’s eligibility and service area guidance. If you’re unsure which you are, read Google’s own wording before you set up.",
        head: ["Type", "What it means", "Examples"],
        rows: [
          ["Storefront", "Customers come to you at a staffed address", "A café, a shop, a salon, a kitchen with a collection counter"],
          ["Service-area business", "You go to customers or deliver, but don’t serve them at your address", "A plumber, a cleaner, a delivery-only meal prep kitchen"],
          ["Hybrid", "Customers can visit you, and you also deliver or travel to them", "A restaurant that also delivers, a farm shop with a veg box round"],
        ],
      },
      {
        type: "p",
        text: "Some businesses can’t have a profile at all. Google lists online-only businesses and brands, lead generation companies, rental properties and P.O. box or remote mailbox addresses among those that aren’t eligible. So if you only sell online and post everything nationally, a profile isn’t for you, and your effort is better spent on your website and search. Google does allow delivery-only food businesses, with some conditions, which matters for a lot of meal prep kitchens I work with.",
      },
      {
        type: "callout",
        title: "Don’t invent an address",
        text: "Using a virtual office, a mailbox or a friend’s address to get a pin on the map breaks Google’s rules and can get the profile suspended. If customers don’t visit you, set yourself up as a service-area business instead. It’s allowed, and it works.",
      },

      { type: "h2", text: "Setting It Up Step by Step" },
      {
        type: "p",
        text: "Before you start, search for your business name on Google Maps. There may already be a profile, created by Google or by a customer, waiting to be claimed. If there is, claim it rather than making a second one, because duplicates confuse Google and split your reviews.",
      },
      {
        type: "list",
        items: [
          "**Use the right Google Account.** Ideally one tied to a business email you control. If someone else sets it up for you, make sure you’re the owner and they’re added as a manager.",
          "**Enter your business name exactly as customers see it**, on your signage, packaging and paperwork. Resist adding keywords or your town to the name.",
          "**Pick your primary category carefully.** It’s one of the strongest signals of what you do. Choose the most specific one that fits, then add a few secondary categories.",
          "**Add your address or service area**, depending on which type of business you are.",
          "**Add your phone number and website.** Use your main number and your own website, not a link to a third-party ordering page if you can avoid it.",
          "**Set your hours**, including any times you’re only open for collection.",
          "**Verify the profile** and wait for Google to confirm it.",
        ],
      },

      { type: "h2", text: "Verification: What to Expect" },
      {
        type: "p",
        text: "Google needs to know you really run the business before your profile goes fully live. You don’t get to pick the method. Google offers whichever options suit your business type, location and hours, and sometimes asks for more than one.",
      },
      {
        type: "list",
        items: [
          "**Video:** Google’s recommended option where it’s available. You record or join a call during your opening hours, showing your location and something that proves you manage the business, such as signage, equipment or paperwork.",
          "**Phone or text:** a code sent to the business number. It needs to reach a real phone, as automated answering systems won’t pass the code on.",
          "**Email:** a code sent to an address shown on screen.",
          "**Postcard:** not available to every business. Most cards arrive within 14 days and the code expires after 30.",
        ],
      },
      {
        type: "p",
        text: "Once you’ve done your part, Google says its review can take up to five business days, occasionally longer. The most common way to slow things down is to start editing your name, address or category while you wait, or to request a new postcard before the first has had time to arrive. Set the details correctly first, then leave it alone until you hear back.",
      },

      { type: "h2", text: "Service Areas for Delivery Businesses" },
      {
        type: "p",
        text: "If you deliver, the service area is where you tell Google where you go. You can add up to 20 areas, using towns, cities or postcodes, but not a simple radius around your base. Google also asks that the whole area stays within roughly two hours’ drive of where you operate from.",
      },
      {
        type: "p",
        text: "If customers never come to your premises, remove the address from the profile and show only the service area. A delivery-only kitchen in Wallsend, for example, might list Newcastle, North Tyneside, South Tyneside and Sunderland rather than a pin on an industrial estate that nobody should turn up to. A hybrid business, such as a takeaway that also delivers, can show both its address and its service area.",
      },
      {
        type: "callout",
        title: "Match it to your website",
        text: "Your service area on Google and the postcodes your website accepts should agree. If the profile says you deliver to Durham and the postcode check on your site says no, that customer won’t trust either. It’s one of the reasons I build a postcode check into delivery sites from the start.",
      },

      { type: "h2", text: "How to Show Up Higher in the Map Results" },
      {
        type: "p",
        text: "Google says local results are mainly decided by three things. **Relevance** is how well your profile matches what someone searched for. **Distance** is how far you are from the person searching, or from the place they named. **Prominence** is how well known your business is, which takes in your reviews and rating and how much the rest of the web mentions and links to you.",
      },
      {
        type: "p",
        text: "You can’t change where your customers are standing, so distance is out of your hands. Google is also clear that there’s no way to pay for a better local ranking. What you can influence is relevance and prominence:",
      },
      {
        type: "list",
        items: [
          "**Complete every section.** Categories, hours, attributes, products or services and a description in plain words about what you do.",
          "**Keep your hours right**, including bank holidays and Christmas. Wrong hours lead to frustrated customers and bad reviews.",
          "**Add real photos regularly**: your food, your premises, your team, your packaging. Phone photos taken in good light are fine.",
          "**Build up reviews steadily.** A slow, steady flow of genuine reviews looks far healthier than a burst followed by silence.",
          "**Have a good website behind it.** Your site should say clearly what you do and where you do it, with the same name, address and phone number as your profile.",
          "**Get mentioned locally.** Local press, suppliers, markets and business groups linking to your site all add to how well known you are.",
        ],
      },

      { type: "h2", text: "Reviews: Getting Them and Replying to Them" },
      {
        type: "p",
        text: "Reviews do two jobs. They help you appear in the first place, and they’re often what makes someone choose you over the business listed above you. Most happy customers will leave one if you ask at the right moment and make it easy.",
      },
      {
        type: "p",
        text: "Google lets you share a review link or a QR code straight from your profile. Put the link in your order confirmation email, on a card in the box, or in a follow-up message a day after delivery. Customers need to be signed in to a Google Account to post a review, though they can make one with any email address.",
      },
      {
        type: "callout",
        title: "Never pay for reviews",
        text: "Google treats offering a discount, freebie or any other reward in return for a review as fake and misleading content, and it’s strictly prohibited. That includes “10% off your next order for a review”. Ask everyone, reward no one, and you’re fine.",
      },
      {
        type: "p",
        text: "Reply to your reviews, all of them if you can. Google recommends keeping replies short, friendly and specific, and never using them to push offers. With a negative review, stay calm, apologise where it’s deserved, take responsibility for what was in your control and offer to put it right. Never share the customer’s details or get personal. A fair, polite reply is read by every future customer, and Google notes it can even encourage the reviewer to update what they wrote.",
      },

      { type: "h2", text: "Your Monthly Checklist" },
      {
        type: "p",
        text: "A profile isn’t something you set up once and forget. Twenty minutes a month keeps it healthy:",
      },
      {
        type: "list",
        items: [
          "Reply to any new reviews.",
          "Add a few new photos, ideally of this month’s products or menu.",
          "Check your hours, and add special hours for any holidays coming up.",
          "Post an update about anything new: a menu change, a new delivery area, a seasonal box.",
          "Check that the website link, phone number and service area are still right.",
          "Glance at your profile’s performance figures to see how many people called, clicked or asked for directions.",
        ],
      },

      { type: "h2", text: "Common Mistakes" },
      {
        type: "list",
        items: [
          "**Letting a designer or agency own the profile.** If you fall out or they disappear, getting it back is slow. You should be the owner.",
          "**Stuffing keywords into the business name.** It might help briefly, but it risks suspension and looks spammy to customers.",
          "**Two profiles for one business**, often after a move or a rebrand. Merge or remove duplicates.",
          "**Out-of-date hours**, especially over Christmas and bank holidays.",
          "**Linking to a slow or confusing website.** All that visibility is wasted if people bounce off the site.",
        ],
      },

      { type: "h2", text: "What I’d Recommend" },
      {
        type: "p",
        text: "If you serve customers locally, set up your Google Business Profile this week. It costs nothing, and for many small businesses it’s the single most useful thing they can do online after having a good website. Get eligible the honest way, fill in every section, set a sensible service area, and make asking for reviews part of how every order ends.",
      },
      {
        type: "p",
        text: "Then make sure the website it points to can finish the job. On my Stay package, search is part of the build, so your site and your profile tell Google the same story about what you sell and where. You can see how that plays out on [my work page](/work), read more about working with a [web designer in Newcastle](/web-designer-newcastle), or [book a free consultation](/book) and I’ll look at your profile and your site together and tell you honestly what would make the biggest difference.",
      },
    ],
    sources: [
      {
        label: "Google Business Profile Help: Business eligibility and ownership guidelines",
        url: "https://support.google.com/business/answer/13763036",
      },
      {
        label: "Google Business Profile Help: Manage your service areas",
        url: "https://support.google.com/business/answer/9157481",
      },
      {
        label: "Google Business Profile Help: Verify your business on Google",
        url: "https://support.google.com/business/answer/7107242",
      },
      {
        label: "Google Business Profile Help: How to improve your local ranking on Google",
        url: "https://support.google.com/business/answer/7091?hl=en-GB",
      },
      {
        label: "Google Business Profile Help: Tips to get more reviews",
        url: "https://support.google.com/business/answer/3474122",
      },
    ],
  },
  {
    slug: "selling-subscriptions-on-shopify",
    title: "Selling Subscriptions on Shopify: How It Works",
    description:
      "Selling subscriptions on Shopify explained: which app to use, payment rules, pause and skip, failed payments, UK law and how to set it up for a food business.",
    published: "2026-11-21",
    updated: "2026-11-21",
    readingMinutes: 8,
    tags: ["Subscriptions", "Shopify", "Ecommerce", "Food Business", "Meal Prep"],
    lede: "A subscription turns a one-off customer into a regular one. For a meal prep kitchen, a veg box scheme or a coffee roaster, it’s often the difference between guessing next week’s orders and knowing them. Shopify makes subscriptions possible on almost any store, but there are a few decisions and a few catches worth understanding before you switch it on. This is how it works, in plain words.",
    body: [
      { type: "h2", text: "The Quick Answer" },
      {
        type: "p",
        text: "Shopify doesn’t run subscriptions on its own. You add a subscription app, and the app creates the plans, takes the repeat payments and gives customers a way to manage what they’ve signed up for. For most small businesses, the starting point looks like this:",
      },
      {
        type: "list",
        items: [
          "**Start with the free Shopify Subscriptions app** unless you already know you need something it can’t do.",
          "**Use Shopify Payments** if you can, because it supports the widest range of ways to pay on repeat orders.",
          "**Offer a clear reason to subscribe**, usually a modest saving, without hiding the one-off option.",
          "**Let customers pause, skip and cancel themselves.** It feels risky, but it keeps more subscribers than it loses.",
          "**Decide what happens when a payment fails** before your first renewal, not after.",
          "**Get your terms right**, because UK rules on subscriptions are tightening.",
        ],
      },

      { type: "h2", text: "How Subscriptions Work on Shopify" },
      {
        type: "p",
        text: "On a Shopify store, a subscription is really a purchase option attached to a product. Alongside the normal price, the product page shows a choice such as “Deliver every week and save 5%”. When someone picks it and pays, Shopify stores their payment method securely and the app creates a contract that renews on the schedule you set. Each renewal becomes a normal order in your admin, so it flows into your fulfilment the same way a one-off order does.",
      },
      {
        type: "p",
        text: "For each product you can sell it as a subscription only, or offer both a one-off purchase and a subscription. Shopify notes that products sold only as a subscription can only be sold through the online store, so if you also sell in person or through other channels, offering both is usually the safer choice. Shopify also adds a subscription cancellation policy to your store automatically and shows subscription wording at checkout, so customers know what they’re agreeing to.",
      },

      { type: "h2", text: "Choosing a Subscription App" },
      {
        type: "p",
        text: "There are two broad routes. Shopify’s own app is free and covers the essentials. Paid apps add more control over retention, bundles and the customer portal, in return for a monthly fee and often a percentage of every subscription order.",
      },
      {
        type: "table",
        caption: "A simplified comparison. Paid app pricing changes often and is usually charged in US dollars, so check the current listing before you commit.",
        head: ["", "Shopify Subscriptions", "Paid subscription apps"],
        rows: [
          ["Cost", "Free", "Monthly fee, and often a fee per transaction"],
          ["Frequencies", "Weekly, monthly or yearly", "Usually more flexible"],
          ["Discounts", "Percentage, fixed amount and subscribe and save", "Similar, often with tiered or loyalty rewards"],
          ["Customer self-service", "Skip, pause, resume, cancel, update payment and address", "Often adds swapping products and changing dates"],
          ["Bundles", "Not compatible with bundles", "Some support customer-built boxes"],
          ["Best for", "Simple repeat products and most new subscription offers", "Larger stores with complex boxes or retention needs"],
        ],
      },
      {
        type: "p",
        text: "Recharge is the best-known paid option. Its listing shows a monthly plan fee plus a percentage and a fixed amount on each transaction, which adds up quickly once you have a few hundred subscribers. Other apps such as Appstle, Seal and Loop sit at different price points, and several have free tiers for small stores. None of this makes them a bad choice. It just means the app becomes a running cost that grows with your success, and that’s worth knowing at the start.",
      },
      {
        type: "callout",
        title: "Don’t uninstall casually",
        text: "Shopify warns that uninstalling the Shopify Subscriptions app deletes all of your plans, contracts and subscription discounts. If you ever move to a different app, plan the migration properly so your existing subscribers carry on being billed.",
      },

      { type: "h2", text: "Payments: The Part People Miss" },
      {
        type: "p",
        text: "A subscription only works if the payment method can be charged again without the customer being present. That rules out some ways of paying. Shopify lists Shopify Payments, PayPal Express, Authorize.net, Adyen and, for selected merchants, Stripe as gateways that support subscriptions, depending on your region.",
      },
      {
        type: "p",
        text: "With Shopify Payments, customers can subscribe using Shop Pay, Apple Pay, Google Pay or PayPal as well as a card, although Shopify says Apple Pay for subscriptions is limited to Visa and Mastercard. Other gateways are more restrictive. On Authorize.net, for example, Apple Pay and Google Pay aren’t supported. Since so many food and drink orders happen on a phone, those express payment buttons matter, and it’s one more reason I’d use Shopify Payments where possible.",
      },
      {
        type: "p",
        text: "Gift cards are another small trap. Shopify says a gift card used on a subscription only covers the first payment, so customers paying that way need a card on file for the renewals.",
      },

      { type: "h2", text: "Pause, Skip and Cancel: Let Customers Do It" },
      {
        type: "p",
        text: "The instinct is to make cancelling hard. It usually backfires. A customer who can’t find the cancel button disputes the charge with their bank instead, and you lose the customer, the money and possibly a fee. A customer who can skip a week while they’re on holiday often just comes back the week after.",
      },
      {
        type: "p",
        text: "With Shopify Subscriptions, customers manage their subscription from their account on your store, and the emails they receive include a link to manage it. They can skip, pause, resume or cancel, and update their payment method and delivery address. Make that link easy to find in your menu and in every confirmation email. For a meal prep or veg box business, “skip next week” should be the most obvious button on the page.",
      },
      {
        type: "callout",
        title: "UK subscription rules are changing",
        text: "The Digital Markets, Competition and Consumers Act 2024 brings in a new regime for consumer subscriptions, currently expected to take effect in 2027. It covers clear information before sign-up, reminders before renewals, cooling-off rights and making it easy to leave. Building easy self-service in now means you won’t be scrambling later. I’m not a lawyer, so check the detail with a legal adviser once the final guidance is published.",
      },

      { type: "h2", text: "When a Payment Fails" },
      {
        type: "p",
        text: "Cards expire and accounts run low, so some renewals will fail. Shopify Subscriptions lets you set how many times it retries a failed payment and how many days it waits between attempts, with customers notified each time. You also choose what happens once the retries run out: skip that order, pause the subscription or cancel it. There’s a separate setting for when a renewal can’t go through because you’ve run out of stock.",
      },
      {
        type: "p",
        text: "For perishable food, timing matters more than it does for most shops. If your kitchen shops on Thursday for Sunday delivery, a payment that succeeds on Saturday after three retries is no use. Set the renewal date and the retry window so that you know who has paid before you buy ingredients, and pick skip rather than cancel as the final step, so a missed payment doesn’t lose you the customer for good.",
      },

      { type: "h2", text: "Subscriptions for Food, Meal Prep and Veg Boxes" },
      {
        type: "p",
        text: "Food businesses are where subscriptions shine, and also where they get complicated. A simple product such as a weekly coffee bag or a fixed veg box fits the standard model perfectly. A meal prep box where the menu changes every week and customers choose their own dishes does not, because the subscription renews a product, not a set of choices.",
      },
      {
        type: "p",
        text: "The approach that tends to work is to make the subscription about the box rather than the dishes. The customer subscribes to “10 meals a week”, and the kitchen either chooses for them or lets them pick next week’s dishes before the cutoff. Because Shopify Subscriptions doesn’t work with bundles, a customer-built box on subscription usually needs either a paid app or a custom build. On the meal prep sites I’ve built, the subscribe option sits right next to the one-off order. Real Food Delivered and The Macro Kitchen both take 5% off for subscribing, and JKitchen Cooks takes 15% off the first box. You can see them on [my work page](/work).",
      },
      {
        type: "p",
        text: "One legal point is specific to food. Under the Consumer Contracts Regulations, online buyers of goods normally have 14 days to cancel after delivery, but that right doesn’t apply to goods that can deteriorate or expire rapidly. Fresh meals and produce usually fall into that exception, though your terms should still say so clearly. I covered the other essentials, including allergens and delivery cutoffs, in [what every meal prep website needs](/blog/what-every-meal-prep-website-needs).",
      },

      { type: "h2", text: "Setting It Up: A Step-by-Step Checklist" },
      {
        type: "list",
        items: [
          "**Check your payment set-up.** Make sure you’re on a gateway that supports subscriptions, ideally Shopify Payments.",
          "**Install the subscription app** and decide which products can be bought on subscription.",
          "**Choose your frequencies.** Weekly for food and fresh produce, monthly for most other repeat products.",
          "**Set the saving.** A small percentage is usually enough. Make sure your margins can carry it on every order, not just the first.",
          "**Check your theme** shows the subscription option clearly on the product page, the cart and the order confirmation.",
          "**Set your failed payment rules**, matched to when you need to know who has paid.",
          "**Write your terms**: how renewals work, how to skip or cancel and any cutoffs.",
          "**Customise the emails** so the link to manage the subscription is easy to find.",
          "**Place a test subscription yourself**, on your phone, then skip, pause and cancel it to see what your customers will see.",
        ],
      },

      { type: "h2", text: "Common Mistakes to Avoid" },
      {
        type: "list",
        items: [
          "**Hiding the one-off option.** Some people want to try you first. Forcing a subscription puts them off entirely.",
          "**A saving you can’t afford.** A 20% discount feels generous until it applies to every order for a year.",
          "**No skip button.** Without one, a holiday becomes a cancellation.",
          "**Renewals that ignore your production schedule**, so you’re buying stock before you know who has paid.",
          "**Choosing a paid app before you need it.** Start simple and move up when the features earn their fee.",
        ],
      },

      { type: "h2", text: "What I’d Recommend" },
      {
        type: "p",
        text: "If you sell something people buy again and again, a subscription is one of the best things you can add to your site. For most small businesses, the free Shopify Subscriptions app and Shopify Payments are the right place to start. Keep the offer simple, make the saving clear, let customers skip and cancel without contacting you, and set renewals around how your business actually runs. If your box is customer-built or your menu changes weekly, plan that part carefully, because that’s where off-the-shelf set-ups tend to struggle.",
      },
      {
        type: "p",
        text: "Subscriptions are part of my Stay package, alongside a postcode check and a custom build-a-box with no monthly fee to an outside company. You can compare what’s included on my [packages page](/packages) or get a quick figure from the [estimate tool](/estimate). If you’d rather talk it through, [book a free consultation](/book) and I’ll tell you honestly whether subscriptions suit your business and the simplest way to set them up.",
      },
    ],
    sources: [
      {
        label: "Shopify Help Center: Shopify Subscriptions",
        url: "https://help.shopify.com/en/manual/products/purchase-options/shopify-subscriptions",
      },
      {
        label: "Shopify Help Center: Subscription considerations and payment gateways",
        url: "https://help.shopify.com/en/manual/products/purchase-options/subscriptions/considerations",
      },
      {
        label: "Shopify Help Center: Managing Shopify Subscriptions",
        url: "https://help.shopify.com/en/manual/products/purchase-options/shopify-subscriptions/manage-subscriptions",
      },
      { label: "Shopify App Store: Recharge Subscriptions", url: "https://apps.shopify.com/subscription-payments" },
      {
        label: "legislation.gov.uk: Consumer Contracts Regulations 2013, Part 3",
        url: "https://www.legislation.gov.uk/uksi/2013/3134/part/3",
      },
      {
        label: "DWF: DMCCA subscription contracts regime, preparing for the new restrictions",
        url: "https://dwfgroup.com/en/news-and-insights/insights/2026/10/dmcca-subscription-contracts-regime-preparing-for-the-new-restrictions",
      },
    ],
  },
  {
    slug: "what-every-meal-prep-website-needs",
    title: "What Every Meal Prep Website Needs",
    description:
      "What every meal prep website needs: a weekly menu, postcode check, build-a-box, macros, allergens, flexible subscriptions and a visible cutoff, in plain words.",
    published: "2026-11-17",
    updated: "2026-11-17",
    readingMinutes: 9,
    tags: ["Meal Prep", "Food Business", "Ecommerce", "Subscriptions", "Shopify"],
    lede: "A meal prep website has a harder job than most shops. The menu changes every week, orders close on a deadline, delivery only reaches certain postcodes and half your customers want to count their protein before they pay. I’ve built sites for several meal prep kitchens, and these are the pieces I’d never launch without.",
    body: [
      { type: "h2", text: "The Quick Answer" },
      {
        type: "p",
        text: "If you’re planning a new site or reviewing the one you have, these are the essentials. Everything else in this article explains why each one matters and how to get it right.",
      },
      {
        type: "list",
        items: [
          "**This week’s menu, front and centre**, with a photo, price and macros for every dish.",
          "**A postcode check before anything else**, so nobody builds a box you can’t deliver.",
          "**Delivery days and the order cutoff on the homepage**, ideally with a countdown.",
          "**A build-a-box** that lets people choose a box size and fill it, within your limits.",
          "**Allergen information for every dish**, available before people pay.",
          "**Subscriptions customers can pause and skip**, so a holiday doesn’t become a cancellation.",
          "**A menu you can change yourself** each week without touching the design.",
          "**A site that works on a phone**, because that’s where most orders happen.",
        ],
      },

      { type: "h2", text: "Why Meal Prep Is Different From a Normal Shop" },
      {
        type: "p",
        text: "A normal online shop sells the same products month after month, ships anywhere and takes orders at any hour. A meal prep kitchen sells a menu that changes weekly, cooks to a production schedule, delivers chilled food to a limited area on set days and needs to know exactly how many portions of each dish to make before the shopping is done.",
      },
      {
        type: "p",
        text: "That’s why a standard theme with a product grid rarely works well. It can take the money, but it doesn’t answer the questions customers actually have, and it doesn’t protect the kitchen from orders it can’t fulfil. The best meal prep sites are built around the way the kitchen runs, not the other way round.",
      },

      { type: "h2", text: "Put the Menu Where People Can See It" },
      {
        type: "p",
        text: "The menu is the product. People come to see what’s cooking this week, so don’t make them click through three pages to find it. Show the dishes on the homepage with a real photo, the price and the key numbers, and let a tap on any dish start the order.",
      },
      {
        type: "p",
        text: "Behind the scenes, the menu should be easy for you to change. On The Macro Kitchen, the weekly menu comes straight from the kitchen’s Shopify products, so changing the week means editing products rather than editing the website. If updating your menu currently means emailing a developer or wrestling with a page builder every Thursday, that’s a sign the site wasn’t built for a weekly menu.",
      },

      { type: "h2", text: "Answer “Do You Deliver to Me?” First" },
      {
        type: "p",
        text: "Delivery is the first question every new customer has, and it should be the first thing your site answers. A postcode check at the start of the order saves people from spending ten minutes choosing meals for an address your drivers don’t cover, and it saves you the awkward refund.",
      },
      {
        type: "list",
        items: [
          "**Check the postcode before the box**, not at checkout.",
          "**Name the delivery days.** If different areas get different days, say which day applies once someone enters their postcode.",
          "**Make the cutoff impossible to miss.** A countdown to the moment orders close tells people when to act and stops the “can I still order?” messages.",
          "**Explain the options outside your area**, such as a nationwide courier box or collection, with the price of each.",
        ],
      },
      {
        type: "p",
        text: "You can see this pattern across [my work](/work). JKitchen Cooks closes orders at 5pm on Friday for Sunday delivery and checks the postcode before the box. Real Food Delivered shows a countdown to its Friday menu lock and spells out two local drops and a nationwide Tuesday box.",
      },

      { type: "h2", text: "Let Customers Build Their Own Box" },
      {
        type: "p",
        text: "Most meal prep customers want some control. They want to pick a box size, choose the dishes and maybe add breakfasts or snacks. A good build-a-box makes that feel simple: choose how many meals, fill the slots, see the running total and check out. A poor one sends people back and forth between product pages trying to remember what they’ve picked.",
      },
      {
        type: "p",
        text: "The rules matter as much as the layout. Your box should enforce your limits, such as fixed box sizes, a maximum number of one dish or dishes that sell out once a batch is gone, so you never receive an order you can’t cook. On The Macro Kitchen, customers say who’s eating, pick 5, 7, 10 or 14 meals a week and then choose dishes. JKitchen Cooks runs boxes from 6 to 15 meals with breakfasts and juices as extras.",
      },
      {
        type: "callout",
        title: "Watch the monthly app fees",
        text: "Many kitchens run their box through a third-party bundle app with a monthly fee that rises as they grow. That can be a sensible way to start. But if the box is central to your business, it’s worth knowing it can be built into your own site instead. On my Box and Stay packages the build-a-box is custom and belongs to you, with no monthly fee to an outside company.",
      },
      {
        type: "p",
        text: "It also helps to offer a simpler route for people who don’t want to choose. Real Food Delivered puts Build Your Box next to set calorie plans between 1,250 and 3,500 kcal a day, so a customer can either pick every meal or hand the decision to the kitchen.",
      },

      { type: "h2", text: "Show the Numbers on Every Dish" },
      {
        type: "p",
        text: "A lot of meal prep customers are training, cutting or tracking. For them, the macros aren’t a nice extra, they’re the reason to buy. Put the numbers on the dish, not in a PDF, and consider a filter for things like high protein.",
      },
      {
        type: "table",
        caption: "What I’d show on each dish. Allergen information is a legal requirement; the rest is what customers expect.",
        head: ["Information", "Why it matters"],
        rows: [
          ["Photo of the actual dish", "Sells the food and sets honest expectations"],
          ["Price", "No surprises when the box total updates"],
          ["Calories", "The first number most customers look for"],
          ["Protein, carbs and fat", "Essential for anyone tracking their intake"],
          ["Allergens", "Required by law before purchase when selling food online"],
          ["Storage and reheating", "Reduces questions and keeps food safe at home"],
        ],
      },

      { type: "h2", text: "Get Allergen Information Right" },
      {
        type: "p",
        text: "This is the part with legal weight. In the UK, when you sell food online or over the phone, customers must be able to get allergen information before they complete the order, and again when the food is delivered. That covers the 14 major allergens, including milk, eggs, gluten-containing cereals, peanuts, tree nuts, sesame, soya, fish, crustaceans, molluscs, celery, mustard, lupin and sulphites.",
      },
      {
        type: "p",
        text: "How you provide it depends on whether your food counts as prepacked. Prepacked food needs a full ingredients list with allergens emphasised, and you should show the same information online. Non-prepacked food doesn’t need a full ingredients list, but the allergen information still has to be accurate at both stages. The Food Standards Agency recommends giving it in writing at both points. If you’re unsure which category your meals fall into, ask your local council’s food team before launch, because it affects your labels as well as your website.",
      },
      {
        type: "callout",
        title: "Make it part of the dish, not a separate page",
        text: "The safest set-up is allergens stored against each dish, shown on the menu and the dish page, and printed on the label from the same source. When a recipe changes, you update it once and the website and labels stay in step.",
      },

      { type: "h2", text: "Subscriptions That Bend Instead of Break" },
      {
        type: "p",
        text: "Regular customers are what make a meal prep business work, and a subscription means the next order doesn’t rely on someone remembering to come back. The catch is that life gets in the way. Holidays, a week of eating out or a change in training plans are the moments subscribers cancel, unless they can simply skip a week.",
      },
      {
        type: "p",
        text: "On Shopify, the free Shopify Subscriptions app supports weekly and monthly renewals and subscribe-and-save discounts, and customers can pause, skip, resume or cancel from their account. They sign in with their email and a one-time code rather than a password, which keeps it painless. Make the saving clear without hiding the one-off option. Real Food Delivered and The Macro Kitchen both offer a 5% saving for subscribing, and JKitchen Cooks takes 15% off the first box.",
      },

      { type: "h2", text: "Build It for the Phone" },
      {
        type: "p",
        text: "Real Food Delivered was designed on the basis that most of its orders are made on a phone, and the same goes for most food businesses I speak to. People order in spare moments, often just before the cutoff. That means the box builder needs big, easy-to-tap buttons, a running total that stays visible and a checkout with Apple Pay, Google Pay or Shop Pay switched on. Test the whole order on your own phone over mobile data, not just on a laptop.",
      },
      {
        type: "p",
        text: "Speed matters here too. Food sites are photo-heavy, so images need to be properly sized and compressed or the menu will crawl on a 4G connection. I covered the most common speed and checkout problems in [website mistakes that quietly cost you orders](/blog/website-mistakes-that-cost-you-orders).",
      },

      { type: "h2", text: "Give People Reasons to Trust Your Kitchen" },
      {
        type: "p",
        text: "Buying a week of food from a kitchen you’ve never visited takes trust. Show who cooks it, where and how. Real photos of the team and the kitchen go a long way, as do genuine reviews close to the order button.",
      },
      {
        type: "p",
        text: "Your food hygiene rating is worth showing too. Displaying it online isn’t a legal requirement in England, Wales or Northern Ireland, but the Food Standards Agency strongly encourages it, and its own audit found only around one in ten businesses do. If you have a good rating, it’s an easy way to stand out.",
      },

      { type: "h2", text: "Don’t Forget the Basics Behind the Site" },
      {
        type: "p",
        text: "A website makes a meal prep business look established, but the legal groundwork still has to be in place. Any business that prepares and sells food must register with its local council, including home kitchens and businesses that only sell online, and the usual advice is to do it around 28 days before you start trading. Chilled food must be kept at 8°C or below in England, Wales and Northern Ireland, which affects how you deliver as well as how you store. None of this lives on the website, but it shapes what the website promises, such as delivery areas and times.",
      },

      { type: "h2", text: "Must-Haves and Nice-to-Haves" },
      {
        type: "table",
        head: ["Must-have at launch", "Worth adding as you grow"],
        rows: [
          ["Weekly menu with photos, prices and macros", "Filters such as high protein or vegetarian"],
          ["Postcode check and delivery days", "Different days or prices by area"],
          ["Visible cutoff", "A live countdown"],
          ["Build-a-box with your limits", "Set calorie plans alongside"],
          ["Allergens on every dish", "Reheating and storage guides"],
          ["Guest checkout with express payments", "Subscriptions with pause and skip"],
          ["A menu you can edit yourself", "Goal-based example weeks"],
        ],
      },

      { type: "h2", text: "A Checklist Before You Launch" },
      {
        type: "list",
        items: [
          "Can a new visitor see this week’s menu within one scroll of the homepage?",
          "Does the postcode check happen before anyone starts a box?",
          "Are your delivery days and cutoff on the homepage?",
          "Does the box stop customers going over your limits or ordering sold out dishes?",
          "Does every dish show its allergens, and do they match your labels?",
          "Can subscribers skip a week without contacting you?",
          "Can you change next week’s menu yourself in under an hour?",
          "Have you placed a full test order on your phone over mobile data?",
          "Is your food hygiene rating and a way to contact you easy to find?",
          "Are you registered with your local council, with chilled delivery planned?",
        ],
      },

      { type: "h2", text: "What I’d Recommend" },
      {
        type: "p",
        text: "If you’re just starting, get the must-haves right and keep everything else simple. A clear menu, a postcode check, a visible cutoff and accurate allergens will do more for your orders than any clever feature. If you’re already trading and paying for several apps to hold it all together, it may be time for a site built around how your kitchen actually works.",
      },
      {
        type: "p",
        text: "You can [see the meal prep sites I’ve built](/work), or look at my [packages](/packages), where Box adds the postcode check and a custom build-a-box and Stay adds subscriptions on top. If you’d like to talk it through, [book a free consultation](/book). I’m based in the North East and can meet in person or on a video call, and I’ll tell you honestly what your kitchen needs and what it doesn’t.",
      },
    ],
    sources: [
      {
        label: "CIEH: Selling food online, allergen responsibilities explained",
        url: "https://www.cieh.org/training-and-courses/resources/food-safety/selling-food-online-allergen-responsibilities-explained/",
      },
      { label: "GOV.UK: Food business registration", url: "https://www.gov.uk/guidance/food-business-registration" },
      {
        label: "GOV.UK: Food hygiene for businesses, chilling and freezing",
        url: "https://www.gov.uk/food-hygiene-businesses/chilling-and-freezing",
      },
      {
        label: "Food Standards Agency: Most businesses are missing out on promoting their hygiene rating online",
        url: "https://food.gov.uk/news-alerts/news/majority-of-businesses-are-missing-out-on-the-opportunity-to-promote-their-food-hygiene-rating-online",
      },
      { label: "Shopify App Store: Shopify Subscriptions", url: "https://apps.shopify.com/shopify-subscriptions" },
      {
        label: "Shopify Help Center: Shopify Subscriptions customer experience",
        url: "https://help.shopify.com/en/manual/products/purchase-options/subscriptions/shopify-subscriptions/customer-experience",
      },
    ],
  },
  {
    slug: "website-mistakes-that-cost-you-orders",
    title: "Website Mistakes That Quietly Cost You Orders",
    description:
      "The website mistakes that quietly cost you orders: surprise delivery costs, forced accounts, slow pages and awkward phone checkouts, plus how to fix each one.",
    published: "2026-11-13",
    updated: "2026-11-13",
    readingMinutes: 9,
    tags: ["Conversion", "Ecommerce", "Checkout", "Shopify", "Small Business"],
    lede: "Most websites don’t lose orders in a dramatic way. Nothing crashes and nobody complains. People just look, hesitate and leave, and you never hear about it. These are the mistakes I see most often when I look at a small business site, why they matter and how to put each one right.",
    body: [
      { type: "h2", text: "The Quick Answer" },
      {
        type: "p",
        text: "If you only have ten minutes, check these first. They are the problems that come up again and again, and most of them can be fixed without rebuilding anything.",
      },
      {
        type: "list",
        items: [
          "**Delivery costs that only appear at checkout.** Show the price of delivery, or the threshold for free delivery, before anyone adds to basket.",
          "**Making people create an account to order.** Let them check out as a guest and offer an account afterwards.",
          "**No clear answer to “do you deliver to me, and when?”** Put the area, the days and the order cutoff where people can see them.",
          "**A site designed on a laptop and ordered from on a phone.** Test every step of an order on your own phone.",
          "**Slow pages.** Big images and too many apps are the usual causes.",
          "**Not enough reasons to trust you.** Real photos, contact details, reviews and a clear refund policy.",
          "**A checkout that asks for too much.** Remove every field you don’t need.",
        ],
      },

      { type: "h2", text: "Why Small Leaks Add Up" },
      {
        type: "p",
        text: "Baymard Institute, which has studied online checkouts for well over a decade, puts the average documented cart abandonment rate at around 70%. In other words, roughly seven in ten baskets that get started are never paid for. Some of that is just people browsing, and you’ll never win those back. But a large share leave because of something on the site itself.",
      },
      {
        type: "p",
        text: "In Baymard’s latest survey, once you set aside people who were only looking, the most common reasons for leaving were these:",
      },
      {
        type: "table",
        caption: "Reasons shoppers gave for abandoning an order, from Baymard Institute’s survey of US online shoppers. People could give more than one reason.",
        head: ["Reason for leaving", "Share of shoppers"],
        rows: [
          ["Extra costs such as delivery, tax or fees were too high", "40%"],
          ["Delivery was too slow", "20%"],
          ["Didn’t trust the site with card details", "19%"],
          ["Had to create an account", "18%"],
          ["Checkout was too long or complicated", "17%"],
          ["The website had errors or crashed", "17%"],
          ["Returns policy wasn’t good enough", "13%"],
          ["Couldn’t see the total cost up front", "12%"],
          ["Not enough ways to pay", "9%"],
        ],
      },
      {
        type: "callout",
        title: "A note on the numbers",
        text: "Baymard’s survey is of US shoppers and the exact figures won’t match a UK veg box or meal prep business perfectly. I use it because the pattern is the same one I see here: people rarely leave because they changed their mind about the food. They leave because something about the site made ordering feel uncertain or like hard work.",
      },
      {
        type: "p",
        text: "Baymard also estimates that a typical large ecommerce site could lift its conversion rate by around 35% through better checkout design alone. You won’t get that from one tweak, but it shows how much is usually sitting on the table.",
      },

      { type: "h2", text: "Mistake 1: Surprise Costs at the Last Step" },
      {
        type: "p",
        text: "This is the big one. Someone fills a basket, gets to checkout and finds a delivery charge they weren’t expecting. Even if the charge is fair, the surprise feels like a trick, and a lot of people close the tab.",
      },
      {
        type: "p",
        text: "The fix is simple: tell people early. Put your delivery price, or the spend needed for free delivery, in the header bar, on product pages and in the basket. If delivery depends on where someone lives, let them check their postcode before they start building an order. On my Box and Stay [packages](/packages) the postcode check comes first for exactly this reason, so nobody spends five minutes choosing meals for an address you can’t reach.",
      },

      { type: "h2", text: "Mistake 2: Forcing People to Create an Account" },
      {
        type: "p",
        text: "Asking a first-time customer to make an account with a password before they can pay is one of the easiest ways to lose them. They came to buy dinner, not to sign up for something.",
      },
      {
        type: "p",
        text: "On Shopify there is a checkout setting that requires customers to sign in before checking out. For almost every small shop, I’d leave it switched off. Let people check out as a guest, then invite them to save their details afterwards. Shopify’s Shop sign-in can still give returning customers a fast checkout with their details filled in, without forcing it on anyone. The exception is subscriptions, where customers do need an account to manage deliveries, and even then it should feel like part of the order rather than a hurdle in front of it.",
      },

      { type: "h2", text: "Mistake 3: Leaving People Guessing About Delivery" },
      {
        type: "p",
        text: "Slow delivery was the second biggest reason in Baymard’s survey, and for food businesses the question is usually less about speed and more about certainty. People want to know three things: do you deliver to me, which day will it arrive and when do I need to order by.",
      },
      {
        type: "list",
        items: [
          "**Say where you deliver** in plain words, and back it up with a postcode check rather than a long list of towns.",
          "**Name the delivery days**, not just “we deliver weekly”.",
          "**Show the cutoff.** A visible deadline, such as orders closing on Friday at 5pm, answers the question before it’s asked and gives people a gentle reason to order now.",
          "**Explain collection or courier options** if you offer them, with the price of each.",
        ],
      },
      {
        type: "p",
        text: "You can see how I’ve handled this for meal prep and veg box businesses on [my work page](/work). Several of them put the cutoff front and centre, because that’s the first thing a new customer asks.",
      },

      { type: "h2", text: "Mistake 4: Designed on a Laptop, Ordered on a Phone" },
      {
        type: "p",
        text: "Ofcom’s 2025 research on how the UK goes online found that adults spend around four and a half hours online a day, and most of that time is on a smartphone. Yet many small business sites are still designed and signed off on a big screen.",
      },
      {
        type: "p",
        text: "The result is buttons that are too small to tap, menus that hide the shop, pop-ups that cover the page and can’t be closed, and product options that need sideways scrolling. None of it looks broken on a desktop, which is why it goes unnoticed for months.",
      },
      {
        type: "callout",
        title: "Order from your own site",
        text: "Once a month, place a real order on your own phone over mobile data, not office wifi. Time how long it takes and note every moment you have to pinch, zoom or hunt for something. Then refund yourself. It’s the cheapest piece of testing you’ll ever do.",
      },

      { type: "h2", text: "Mistake 5: A Slow Site" },
      {
        type: "p",
        text: "Speed matters twice over: people leave pages that take too long to appear, and Google uses page experience signals when it ranks sites. Google’s Core Web Vitals give a useful benchmark. A page is considered good when its main content appears within 2.5 seconds, it responds to a tap within 200 milliseconds and the layout doesn’t jump around as it loads, all measured across three quarters of real visits.",
      },
      {
        type: "p",
        text: "On small business sites, the usual causes are photos uploaded straight from a camera at full size, several apps each loading their own code on every page, auto-playing video in the header and, on WordPress, cheap hosting. Compressing images and removing apps you no longer use often makes a noticeable difference in an afternoon. You can check any page for free with Google’s PageSpeed Insights.",
      },

      { type: "h2", text: "Mistake 6: Not Giving People Enough Reasons to Trust You" },
      {
        type: "p",
        text: "Nearly one in five shoppers in Baymard’s survey left because they didn’t trust the site with their card details. Big brands get trust for free. A small business has to earn it on the page.",
      },
      {
        type: "list",
        items: [
          "**Real photos** of your food, your products and ideally the people behind them, not stock images.",
          "**A way to reach you:** an email address, a phone number if you can, and where you’re based.",
          "**Genuine reviews** close to where people decide to buy, not tucked away on one page.",
          "**A clear refund and returns policy**, written in plain English, including what happens if a delivery is missed or something arrives damaged.",
          "**A tidy, up-to-date site.** Last season’s menu or a broken link tells people nobody is minding the shop.",
        ],
      },

      { type: "h2", text: "Mistake 7: A Checkout That Asks Too Much" },
      {
        type: "p",
        text: "Every extra field is another reason to stop. Shopify lets you decide whether fields such as company name, the second address line and the delivery phone number are hidden, optional or required. Unless you really need one, don’t make it required. If your driver needs a phone number, say why next to the field so it doesn’t feel nosy.",
      },
      {
        type: "p",
        text: "The same goes for payment. Not having enough ways to pay was a smaller reason in Baymard’s survey, but it’s an easy one to remove. Make sure the express options your platform supports, such as Apple Pay, Google Pay and Shop Pay on Shopify, are switched on and appear on a phone.",
      },

      { type: "h2", text: "Mistake 8: Errors Nobody Has Noticed" },
      {
        type: "p",
        text: "Website errors were behind 17% of abandoned orders in Baymard’s survey. On a small site these are rarely dramatic crashes. They’re a discount code that no longer works, an app that stopped talking to the checkout after an update, a sold out item that can still be added to the basket or a contact form that sends messages nowhere.",
      },
      {
        type: "p",
        text: "These are the problems that hurt most, because you only find out when someone takes the trouble to tell you, and most people won’t. Regular test orders catch most of them. So does having someone who keeps an eye on the site after launch, which is what my Partner plan is for.",
      },

      { type: "h2", text: "A Checklist You Can Run This Week" },
      {
        type: "list",
        items: [
          "Can a new visitor see the price of delivery, or the free delivery threshold, before they add anything to the basket?",
          "Can they check whether you deliver to their postcode before building an order?",
          "Are your delivery days and order cutoff visible on the homepage?",
          "Can someone check out without creating an account?",
          "Have you placed a real order on your phone, over mobile data, in the last month?",
          "Does your homepage pass Core Web Vitals in PageSpeed Insights on mobile?",
          "Are your photos your own, and is every product and menu item current?",
          "Is your refund policy easy to find and written in plain English?",
          "Is every checkout field you require really necessary?",
          "Are Apple Pay, Google Pay or Shop Pay showing on a phone?",
          "Do your discount codes, contact form and order emails still work?",
          "Have you removed apps and plugins you no longer use?",
        ],
      },
      {
        type: "p",
        text: "If you answer no to two or three of these, you’re very likely losing orders you could be keeping. The good news is that most of them are an afternoon’s work rather than a new website.",
      },

      { type: "h2", text: "When It’s Time for More Than a Fix" },
      {
        type: "p",
        text: "Sometimes the problems run deeper. If ordering on your site means picking from a generic product grid when customers really want to build a box, or if you’re paying for three or four apps to do something the site should do on its own, patching it can cost more over time than building it properly. I wrote about the real costs in [how much a website costs in the UK](/blog/how-much-does-a-website-cost-uk), including the running costs that catch people out.",
      },

      { type: "h2", text: "What I’d Recommend" },
      {
        type: "p",
        text: "Start with the checklist. Fix what you can yourself, and keep placing test orders so you see your site the way customers do. If you find more than you’d like, or you’re not sure why people are leaving, [book a free consultation](/book). I’ll go through your site with you, in person around the North East or on a video call, and tell you honestly whether it needs a few fixes or a fresh start. You can also [see the sites I’ve built](/work) for food and subscription businesses, or look at my [packages](/packages) if you already know you want something new.",
      },
    ],
    sources: [
      {
        label: "Baymard Institute: Cart abandonment rate statistics",
        url: "https://baymard.com/blog/cart-abandonment-rate-statistics",
      },
      {
        label: "web.dev: How the Core Web Vitals thresholds were defined",
        url: "https://web.dev/articles/defining-core-web-vitals-thresholds",
      },
      {
        label: "Shopify Help Center: Editing the checkout form options",
        url: "https://help.shopify.com/manual/checkout-settings/checkout-form-options",
      },
      { label: "Shopify Help Center: Customer accounts", url: "https://help.shopify.com/manual/customers/customer-accounts" },
      {
        label: "Ofcom: From apps to AI search, how the UK goes online in 2025",
        url: "https://www.ofcom.org.uk/media-use-and-attitudes/online-habits/from-apps-to-ai-search-how-the-uk-goes-online-in-2025",
      },
    ],
  },
  {
    slug: "how-much-does-a-website-cost-uk",
    title: "How Much Does a Website Cost in the UK?",
    description:
      "How much does a website cost in the UK? Real 2026 prices for builders, freelancers and agencies, plus the running costs, card fees and apps quotes often miss.",
    published: "2026-11-09",
    updated: "2026-11-09",
    readingMinutes: 8,
    tags: ["Pricing", "Web Design", "Ecommerce", "Shopify", "Small Business"],
    lede: "It’s the question everyone wants answered first, and plenty of web designers dodge it. I’d rather not. Here’s what a website really costs in the UK right now, what pushes the price up or down, and the running costs that tend to get left off the quote.",
    body: [
      { type: "h2", text: "The Quick Answer" },
      {
        type: "list",
        items: [
          "**Doing it yourself on a website builder:** roughly £100 to £350 a year all in for the plan, domain and email, plus a fair amount of your own time.",
          "**A freelance web designer:** a small brochure site is commonly £500 to £1,500, a fuller small business site £1,500 to £3,000, and an online shop commonly £3,000 to £10,000, though a focused shop built on a fixed package can cost less.",
          "**An agency:** usually from around £2,000 to £3,000 for a small site, with specialist ecommerce agencies often quoting £5,000 to £35,000 or more.",
          "**Running costs:** a properly looked after business site typically costs somewhere between £50 and £300 a month once you add the platform, apps, hosting and someone to maintain it.",
        ],
      },
      {
        type: "p",
        text: "Those ranges are wide because “a website” covers everything from three pages and a contact form to a shop that takes weekly subscriptions and checks delivery postcodes. The rest of this guide breaks down where the money goes, so you can tell a fair quote from a bad one.",
      },

      { type: "h2", text: "What You’re Actually Paying For" },
      {
        type: "p",
        text: "A quote for a website is mostly a quote for time. Whoever builds it is charging for some or all of these:",
      },
      {
        type: "list",
        items: [
          "**Planning:** working out what the site needs to do, who it’s for and how people will order.",
          "**Design:** how each page looks on a desktop and a phone, built around your products rather than a generic layout.",
          "**Build:** turning the design into a working site, setting up products, payments, shipping and tax.",
          "**Content:** the words, photos and product descriptions. This is the part that’s most often missing from cheap quotes.",
          "**Testing and launch:** checking every page and the full checkout on real devices, then putting it live on your domain.",
          "**Handover:** showing you how to change a price, add a product and see your orders.",
        ],
      },
      {
        type: "p",
        text: "When two quotes look very different, it’s usually because one includes planning and content and the other doesn’t. Those are the parts that decide whether anyone actually orders, so they’re worth paying for.",
      },

      { type: "h2", text: "Typical UK Prices by Type of Website" },
      {
        type: "p",
        text: "These are typical ranges from UK pricing guides updated this year. Treat them as a sense check rather than a price list, because scope matters far more than the label.",
      },
      {
        type: "table",
        caption: "Typical UK build costs, 2026. Prices vary with location, scope and whether VAT is included.",
        head: ["Type of site", "Freelancer", "Agency", "What it usually means"],
        rows: [
          ["Brochure site", "£500 to £1,500", "From about £2,000", "Three to five pages, a contact form, no shop"],
          ["Small business site", "£1,500 to £3,000", "£2,000 to £8,000", "Five to ten pages you can edit yourself"],
          ["Online shop", "£3,000 to £10,000", "£5,000 to £35,000 or more", "Products, checkout, shipping and payments"],
          ["Complex custom build", "£10,000 to £50,000 or more", "Quoted individually", "Custom features, integrations, many page types"],
        ],
      },
      {
        type: "p",
        text: "Hourly rates follow the same pattern. Freelance web designers in the UK typically charge around £25 to £50 an hour, small agencies around £50 to £150, and larger agencies £75 to £200 or more. You’re paying for the team, the project management and the overheads, which can be worth it on a big project and wasted on a small one.",
      },

      { type: "h2", text: "The Running Costs Nobody Mentions" },
      {
        type: "p",
        text: "The build is a one-off. These costs keep coming, and for a shop they can add up to more than the build over a few years.",
      },
      {
        type: "table",
        caption: "Typical UK running costs, November 2026. Always check the provider’s own pricing before you budget.",
        head: ["Cost", "Typical price", "Worth knowing"],
        rows: [
          ["Domain name", "About £8 to £20 a year", "Cheap first-year deals often renew at a higher price"],
          ["Website builder plan", "About £9 to £259 a month", "Most builders charge less if you pay yearly"],
          ["Shopify plan", "£19, £49 or £259 a month paid yearly", "£25, £65 or £344 if you pay month to month"],
          ["Card fees on Shopify", "2% + 25p down to 1.5% + 25p online", "The rate drops on higher plans"],
          ["WordPress hosting", "About £20 to £300 or more a year", "Cheap hosting is usually the reason a WordPress site is slow"],
          ["Paid theme", "Free to around £400, one-off", "A good free theme is often fine with the right design work"],
          ["Apps and plugins", "£0 to £100 or more a month", "Subscription, review and delivery apps are the usual culprits"],
          ["Maintenance", "£50 to £150 a month from a freelancer", "Agencies often charge £100 to £500 a month"],
        ],
      },
      {
        type: "callout",
        title: "Watch the Shopify platform fee",
        text: "If you take payments on Shopify through a provider other than Shopify Payments, Shopify adds its own fee on top of the card fees: 2% on Basic, 1% on Grow and 0.6% on Advanced. For most small shops, Shopify Payments is the cheaper route.",
      },
      {
        type: "p",
        text: "Apps deserve a special mention. As one example, the Appstle subscriptions app for Shopify has a free tier for very small volumes, then paid plans from about $10 to $100 a month depending on how much subscription revenue you take. That’s a fair price for what it does, but add a box builder, a delivery date picker and a reviews app on top and the monthly bill grows quickly.",
      },

      { type: "h2", text: "What Pushes the Price Up" },
      {
        type: "list",
        items: [
          "**The number of different page designs.** Ten pages that share one layout cost less than five that are all different.",
          "**Selling features beyond a basic shop.** Subscriptions, build-a-box ordering, postcode checks, delivery days and order cutoffs all take real work to get right.",
          "**Content.** If I’m writing the copy, sourcing images or styling product photos, that’s time on top of the build.",
          "**Integrations.** Connecting the site to accounting software, a courier, a CRM or a stock system adds setup and testing.",
          "**Moving from another platform.** Migrating products, customers and order history, and keeping your search rankings, needs care.",
          "**Brand work.** A new logo, colours and type is a project in its own right.",
          "**Tight deadlines.** A site needed in a week means other work gets moved, and that usually costs more.",
        ],
      },

      { type: "h2", text: "Where Cheap Websites Get Expensive" },
      {
        type: "p",
        text: "I’m not against cheap websites. A simple builder site can be exactly right for a new business testing an idea. The problem is a cheap site that quietly costs you orders, or one that has to be rebuilt within a year.",
      },
      {
        type: "p",
        text: "The common ones I see are sites that look fine on a laptop but are awkward to order from on a phone, shops with no clear delivery information, and food businesses paying three or four separate monthly app fees to do something that could have been built once. Over a few years, those subscriptions can cost more than a proper build. That’s why on my Box and Stay packages the build-a-box is made for the business and there’s no monthly fee to an outside company for it.",
      },
      {
        type: "callout",
        title: "Ask who owns it",
        text: "Before you pay anyone, check that the domain, the platform account and any paid apps will be in your name, not the designer’s. If you ever want to move on, you should be able to take the whole site with you.",
      },

      { type: "h2", text: "Freelancer, Agency or Doing It Yourself" },
      {
        type: "list",
        items: [
          "**Doing it yourself** is cheapest in cash and most expensive in time. It suits a new business with a small range and a tight budget, as long as you’re comfortable writing your own copy and taking your own photos.",
          "**A freelancer** gives you one person who designs, builds and answers the phone. You’ll usually pay less than an agency for the same site, and you deal with the person doing the work. The trade-off is capacity: one person can only take on so many projects at once.",
          "**An agency** brings a team, which helps on large or complicated projects with lots of people involved. For a small business site, much of that cost is overhead you don’t need.",
        ],
      },

      { type: "h2", text: "What I Charge" },
      {
        type: "p",
        text: "I’d be a bit of a hypocrite writing this without being open about my own prices. I build ecommerce sites on three [packages](/packages):",
      },
      {
        type: "list",
        items: [
          "**Shop, from £1,000, about 2 weeks.** A bespoke homepage and a store, designed around what you sell, laid out for desktop and mobile and launched on your domain.",
          "**Box, from £1,500, about 3 weeks.** Everything in Shop, plus a postcode check, a custom hero image and a build-a-box your customers use themselves.",
          "**Stay, from £2,000, about 4 weeks.** Everything in Box, plus weekly or monthly subscriptions, search-ready copy and a refresh of your branding.",
        ],
      },
      {
        type: "p",
        text: "The prices are a starting point, and they’re negotiable. Tell me your budget and I’ll shape the work to fit it. Payment is 25% to start and the rest when the site goes live, with flexible options to spread the cost. If you want ongoing help, Partner is £150 a month for six months after launch and covers product and menu changes, fixes and one planned improvement a month. Your platform plan, domain and card fees are separate from the build, so include them in your first year’s budget.",
      },

      { type: "h2", text: "How to Budget for Your Website" },
      {
        type: "list",
        items: [
          "**Write down what the site has to do.** Sell products, take subscriptions, deliver locally, take bookings. This is the biggest driver of cost.",
          "**Pick the platform for how you sell.** My [Shopify vs WordPress vs Squarespace guide](/blog/shopify-vs-wordpress-vs-squarespace) goes through the trade-offs.",
          "**Budget for the first year, not just the build.** Add the build, twelve months of the plan, the domain, any apps, card fees on the sales you expect and any maintenance.",
          "**Get two or three quotes that cover the same things.** Ask each one to list what’s included so you’re comparing like with like.",
          "**Ask what isn’t included.** Copywriting, photos, product upload, training and fixes after launch are the usual gaps.",
          "**Check ownership and handover.** Your name on every account, and a walkthrough before launch.",
          "**Keep a little back.** Something always comes up once real customers start using the site, so leave room for a few small changes.",
        ],
      },
      {
        type: "callout",
        title: "A worked example",
        text: "Say a meal prep business spends £1,500 on the build and goes on Shopify Basic, paid yearly at £19 a month, which is £228. Add a .co.uk domain at roughly £15. If it then takes £20,000 online across 500 orders through Shopify Payments, card fees at 2% + 25p come to about £525. That’s a first year of around £2,270 before any apps or ongoing support, and only the plan, domain and fees repeat in year two.",
      },

      { type: "h2", text: "What I’d Recommend" },
      {
        type: "p",
        text: "Don’t judge a website on the build price alone. Look at what it will cost to run for a year, who will look after it and whether it does the job your customers need, especially on a phone. A site that’s a little more expensive up front but saves you a few monthly fees, or brings in more orders, usually pays for itself.",
      },
      {
        type: "p",
        text: "If you’d like a straight number for your business, [book a free consultation](/book) and I’ll talk it through with you, in person around the North East or on a video call. You can also [get a rough estimate](/estimate) online, or [see the sites I’ve built](/work) for businesses like yours.",
      },
    ],
    sources: [
      {
        label: "Startups.co.uk: How much does a website cost?",
        url: "https://startups.co.uk/websites/how-much-does-a-website-cost",
      },
      {
        label: "ExpertSure: Website design costs guide UK",
        url: "https://www.expertsure.com/uk/web-design/website-design-costs-guide/",
      },
      { label: "ExpertSure: Shopify pricing UK", url: "https://www.expertsure.com/uk/web-design/shopify-pricing-uk/" },
      { label: "Appstle Subscriptions on the Shopify App Store", url: "https://apps.shopify.com/subscriptions-by-appstle" },
      { label: "DomainOffer: .co.uk price comparison", url: "https://domainoffer.net/price-compare-co.uk" },
    ],
  },
  {
    slug: "shopify-vs-wordpress-vs-squarespace",
    title: "Shopify vs WordPress vs Squarespace: Which Is Right for Your Business?",
    description:
      "An honest UK comparison of Shopify, WordPress with WooCommerce and Squarespace: real monthly costs, transaction fees, subscriptions, upkeep and which suits the way you sell.",
    published: "2026-11-08",
    updated: "2026-11-08",
    readingMinutes: 7,
    tags: ["Platforms", "Ecommerce", "Shopify", "WordPress", "Squarespace"],
    lede: "It’s the first question almost every client asks me. The honest answer is that none of them is the best. Each is the best at something, and the right one depends on how you sell, how much you want to look after yourself and where you want the business to be in three years.",
    body: [
      { type: "h2", text: "The Short Answer" },
      {
        type: "list",
        items: [
          "**Shopify** if selling products online is the heart of the business and you want it to just work, every day, without you thinking about servers or updates.",
          "**WordPress with WooCommerce** if content matters as much as the shop, you need something unusual built, or you want to own every part of the site outright.",
          "**Squarespace** if you’re a small brand, a service business or a portfolio with a modest shop on the side, and you want something simple you can edit yourself.",
        ],
      },
      {
        type: "p",
        text: "That’s the summary. The detail is where businesses get caught out, usually on fees, subscriptions and who keeps the site running once it’s live.",
      },

      { type: "h2", text: "What Each One Actually Costs" },
      {
        type: "p",
        text: "Headline prices only tell part of the story. Card fees on every order, paid apps and plugins, and the time spent keeping things updated all add up. Here’s how the running costs compare in the UK, before any design or build work.",
      },
      {
        type: "table",
        caption: "UK running costs, November 2026. Prices change, so always check the platform’s own pricing page.",
        head: ["", "Shopify", "WordPress + WooCommerce", "Squarespace"],
        rows: [
          [
            "Monthly plan",
            "£19 to £259 a month (paid yearly), £25 to £344 paid monthly",
            "Software is free. Hosting from about £5 to £50 a month",
            "About £12 to £79 a month (paid yearly)",
          ],
          [
            "Card fees",
            "From 2% + 25p on Basic, down to 1.5% + 25p on Advanced",
            "Set by your payment provider, such as Stripe or PayPal",
            "Set by Squarespace Payments, Stripe or PayPal",
          ],
          [
            "Extra platform fee",
            "Up to 2% more if you use a payment provider other than Shopify Payments",
            "None",
            "2% on the Basic plan, none on higher plans",
          ],
          [
            "Subscriptions",
            "Through apps such as Appstle, usually a monthly fee",
            "WooCommerce Subscriptions, a paid extension",
            "Built in on higher plans, fewer options",
          ],
          [
            "Upkeep",
            "Handled by Shopify",
            "You or your developer: updates, security, backups",
            "Handled by Squarespace",
          ],
        ],
      },
      {
        type: "p",
        text: "WordPress looks cheapest on paper, but a realistic first year with decent hosting, a premium theme and the plugins a shop needs often lands somewhere between a few hundred and a few thousand pounds. Shopify is the reverse: the plan costs more, but very little is hidden.",
      },

      { type: "h2", text: "Shopify: Built to Sell" },
      {
        type: "p",
        text: "Shopify does one thing exceptionally well. Checkout is fast and trusted, payments, stock, shipping and tax are all in one place, and it stays up on your busiest day without you doing anything. Apple Pay, Google Pay and Shop Pay come built in, and those make a real difference on mobile.",
      },
      {
        type: "p",
        text: "The trade-offs are that you’re renting the platform rather than owning it, and the more specific features you want, the more monthly app subscriptions you pick up. Content pages and blogs are fine but basic compared with WordPress.",
      },
      {
        type: "callout",
        title: "Good fit",
        text: "Product brands, food and meal prep businesses, anyone selling every day who wants the shop to run itself. Most of the sites I build for businesses taking regular orders are on Shopify.",
      },

      { type: "h2", text: "WordPress and WooCommerce: Total Freedom" },
      {
        type: "p",
        text: "WordPress runs a huge share of the web, and WooCommerce turns it into a shop. You own everything, you can host it anywhere, and there’s almost nothing it can’t be made to do. It’s also the strongest of the three for content, which matters if articles, recipes, guides or SEO are a big part of how customers find you.",
      },
      {
        type: "p",
        text: "That freedom comes with responsibility. Plugins and WordPress itself need regular updates, and a site that’s left alone for a year can become slow or insecure. Quality also varies hugely between themes and plugins. Built properly and looked after, it’s superb. Built cheaply, it’s where most of the broken websites I’m asked to fix come from.",
      },
      {
        type: "callout",
        title: "Good fit",
        text: "Content-heavy businesses, unusual ordering flows, members’ areas, and businesses that want full ownership and have someone to look after the site.",
      },

      { type: "h2", text: "Squarespace: Simple and Polished" },
      {
        type: "p",
        text: "Squarespace is the easiest of the three to manage yourself. The templates look good straight away, hosting and security are handled, and editing a page is genuinely simple. For a service business, a café, a studio or a small product range, it can be all you need.",
      },
      {
        type: "p",
        text: "Where it struggles is growth. There are far fewer integrations than Shopify or WordPress, checkout and subscription options are more limited, and custom features are hard to add. Businesses that start to scale often end up moving, and migrating a shop is never free.",
      },
      {
        type: "callout",
        title: "Good fit",
        text: "Service businesses, portfolios and small shops with a handful of products, where ease of editing matters more than advanced selling features.",
      },

      { type: "h2", text: "Five Questions to Help You Decide" },
      {
        type: "list",
        items: [
          "**How much of your income comes through the website?** If it’s most of it, lean towards Shopify.",
          "**Do you sell subscriptions, boxes or anything with rules?** Shopify with the right apps, or a well-built WooCommerce site, will handle it. Squarespace may not.",
          "**Is content a big part of how people find you?** WordPress is the strongest here.",
          "**Who will look after the site after launch?** If the answer is nobody, avoid an unmaintained WordPress site.",
          "**Where will the business be in three years?** Pick the platform for that business, not just today’s. Moving later costs more than choosing well now.",
        ],
      },

      { type: "h2", text: "What I’d Recommend" },
      {
        type: "p",
        text: "For most businesses that sell products online, especially food, subscriptions and anything with regular orders, I’d start with Shopify. It’s the platform that lets you spend your time on the business rather than the website. Where content and flexibility matter more, WordPress built properly is the better tool. And for a simple site with a small shop, Squarespace is a perfectly sensible choice.",
      },
      {
        type: "p",
        text: "I build on all of them, so I don’t have a reason to push you one way. If you’re not sure which fits, [book a free consultation](/book) and I’ll give you a straight answer based on how you actually sell. You can also [see the sites I’ve built](/work) or [get a rough estimate](/estimate) for your project.",
      },
    ],
    sources: [
      { label: "Shopify UK pricing", url: "https://www.shopify.com/uk/pricing" },
      { label: "Squarespace pricing", url: "https://www.squarespace.com/pricing" },
      {
        label: "ExpertSure: Squarespace pricing UK",
        url: "https://www.expertsure.com/uk/web-design/squarespace-pricing-uk/",
      },
      { label: "WooCommerce", url: "https://woocommerce.com/" },
    ],
  },
];

export const findPost = (slug: string) => posts.find((post) => post.slug === slug);

export const formatPostDate = (iso: string) =>
  new Date(`${iso}T12:00:00Z`).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });

// Plain text of a post, for llms.txt and word counts.
export const postText = (post: Post) =>
  post.body
    .map((block) => {
      if (block.type === "list") return block.items.join(" ");
      if (block.type === "table") return [...block.head, ...block.rows.flat()].join(" ");
      if (block.type === "callout") return `${block.title} ${block.text}`;
      return block.text;
    })
    .join(" ")
    .replace(/\*\*|\[|\]\([^)]*\)/g, "");

import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
import { breadcrumbs, seo, webPage } from "@/lib/seo";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/portion/docs")({
  head: () =>
    seo({
      title: "Portion Shopify Theme Documentation | CreatedByLewis",
      description:
        "How to set up Portion, the Shopify theme for meal prep kitchens: meal metafields, the build-your-box page, subscriptions, product pages and theme settings.",
      path: "/portion/docs",
      schema: [
        webPage("/portion/docs", "Portion theme documentation"),
        breadcrumbs([
          ["Portion", "/portion/docs"],
          ["Documentation", "/portion/docs"],
        ]),
      ],
    }),
  component: DocsPage,
});

const SECTIONS = [
  { id: "start", label: "Getting started" },
  { id: "meals", label: "Setting up meals" },
  { id: "box", label: "The box builder" },
  { id: "subscriptions", label: "Subscriptions" },
  { id: "product", label: "Meal product page" },
  { id: "menu", label: "Weekly menu & collections" },
  { id: "sections", label: "Sections" },
  { id: "settings", label: "Theme settings" },
  { id: "cart", label: "Cart & checkout" },
  { id: "faq", label: "Troubleshooting" },
  { id: "support", label: "Support" },
] as const;

function DocsPage() {
  const [active, setActive] = useState<string>(SECTIONS[0].id);

  useEffect(() => {
    if (!("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && setActive(entry.target.id)),
      { rootMargin: "-20% 0px -70% 0px" },
    );
    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <main className="mx-auto max-w-6xl px-5 py-12 sm:px-8 sm:py-16">
      <p className="text-xs tracking-widest text-muted uppercase">Portion for Shopify · Documentation</p>
      <h1 className="mt-4 max-w-3xl font-display text-5xl leading-display font-medium text-ink sm:text-6xl">
        Launch Your Meal Prep Store.
      </h1>
      <p className="mt-4 max-w-2xl text-lg text-muted">
        Portion is built for meal prep kitchens, ready-meal brands and food subscriptions. Customers build a box of
        meals, see the calories and macros of everything they pick, and check out as a one-off order or a
        subscription.
      </p>

      <details className="mt-8 rounded-xl border border-line bg-card lg:hidden">
        <summary className="flex min-h-11 cursor-pointer items-center px-4 text-sm font-medium text-ink">Contents</summary>
        <TocList active={active} className="px-2 pb-3" />
      </details>

      <div className="mt-10 grid gap-12 lg:grid-cols-[14rem_minmax(0,1fr)]">
        <nav aria-label="Documentation" className="hidden lg:block">
          <div className="sticky top-24">
            <TocList active={active} />
          </div>
        </nav>

        <div className="min-w-0 space-y-16 text-base leading-relaxed text-muted">
          <Section id="start" eyebrow="Start here" title="Getting started">
            <Steps
              items={[
                <>In your Shopify admin, go to <B>Online Store → Themes</B> and add Portion from the Theme Store.</>,
                <>Click <B>Customize</B> to open the theme editor. Everything in this guide is done there or in your product settings, with no code.</>,
                <>Work through this guide in order: your meal products first, then the box builder page, then the home page.</>,
                <>When you're happy, click <B>Publish</B> on the Themes page.</>,
              ]}
            />
            <Note title="The quickest setup">
              Create a collection of your meals, add the nutrition metafields to each meal, then create a page using
              the <Code>build-a-box</Code> template. That gets a working box builder live in under an hour.
            </Note>
          </Section>

          <Section id="meals" eyebrow="Step 1" title="Setting up your meals">
            <p>
              Each meal is a normal Shopify product. Portion reads its nutrition, ingredients and allergens from{" "}
              <B>product metafields</B>, so the same numbers show on meal cards, the product page and in the box
              builder.
            </p>
            <H3>Create the metafield definitions</H3>
            <p>
              Go to <B>Settings → Custom data → Products</B> and click <B>Add definition</B> for each row below. Use
              the namespace <Code>custom</Code> unless you change it in <A href="#settings">theme settings</A>.
            </p>
            <Table
              head={["Name", "Namespace and key", "Type", "Shows"]}
              rows={[
                ["Calories", <Code key="k">custom.calories</Code>, "Integer", "kcal on cards, product page and box totals"],
                ["Protein", <Code key="k">custom.protein</Code>, "Integer", "Grams of protein"],
                ["Carbs", <Code key="k">custom.carbs</Code>, "Integer", "Grams of carbohydrate"],
                ["Fat", <Code key="k">custom.fat</Code>, "Integer", "Grams of fat"],
                ["Portion weight", <Code key="k">custom.portion_weight</Code>, "Integer", "Portion size in grams on the product page"],
                ["Ingredients", <Code key="k">custom.ingredients</Code>, "Multi-line text", "Ingredients tab"],
                ["Allergens", <Code key="k">custom.allergens</Code>, "Multi-line text", "Allergens tab"],
                ["Heating instructions", <Code key="k">custom.heating_instructions</Code>, "Multi-line text", "Heating instructions tab"],
              ]}
            />
            <p>
              Then open each meal in <B>Products</B>, scroll to <B>Metafields</B> and fill them in. Leave any you don't
              use empty and Portion hides them.
            </p>
            <H3>Dietary tags</H3>
            <p>
              Add product tags such as <Code>High protein</Code>, <Code>Vegan</Code>, <Code>Gluten free</Code> or{" "}
              <Code>Low carb</Code>. These power the filter chips in the weekly menu and box builder, and can show as a
              label on the meal photo. The tag text must match the filter names in the section settings exactly.
            </p>
            <H3>Sizes and variants</H3>
            <p>
              A meal can have variants, such as Regular and Large. The product page shows a size picker and the price
              updates as customers switch. In the box builder, each card adds the first available variant.
            </p>
            <Note title="Allergen information is your responsibility" tone="warn">
              Portion displays whatever you enter. Make sure your allergen information is accurate and meets your local
              food labelling rules.
            </Note>
          </Section>

          <Section id="box" eyebrow="Step 2" title="The box builder">
            <p>
              The box builder lets customers pick meals for each delivery day, see a running total and their average
              daily macros, add extras, then review and check out in one step.
            </p>
            <H3>Create the page</H3>
            <Steps
              items={[
                <>Go to <B>Online Store → Pages → Add page</B> and call it something like "Build your box".</>,
                <>Under <B>Theme template</B>, choose <Code>build-a-box</Code> and save. You don't need any page content.</>,
                <>In the theme editor, choose <B>Pages → build-a-box</B> from the top dropdown and click the <B>Box builder</B> section.</>,
                <>Choose your <B>Meals collection</B>, then add the page to your main menu in <B>Content → Menus</B>.</>,
              ]}
            />
            <H3>How customers build</H3>
            <div className="grid gap-4 sm:grid-cols-2">
              <Card title="Flexible">
                Customers pick any number of meals between your <B>Minimum meals</B> and <B>Maximum meals</B>. Best for
                most kitchens.
              </Card>
              <Card title="Plans">
                Customers first choose a box size, such as 5, 10 or 15 meals. Add a <B>Plan</B> block for each size,
                with a title, bullet points, an optional badge, and a highlight for your most popular plan.
              </Card>
            </div>
            <H3>Delivery days</H3>
            <p>
              Enter your delivery days separated by commas, for example <Code>Sunday, Wednesday</Code>. Customers get a
              tab for each day and choose meals for each one, and the day is saved on each cart line. Leave it empty for
              a single delivery.
            </p>
            <H3>Cut-off and countdown</H3>
            <p>
              Set your <B>Cut-off day</B> and <B>Cut-off hour</B>, and add a message such as "Order by Friday 5pm for
              Sunday delivery". <B>Show countdown</B> displays the real time left until that cut-off. Only turn it on if
              your cut-off is accurate: Shopify doesn't allow fake urgency.
            </p>
            <H3>Extras step</H3>
            <p>
              Add an <B>Extras step</B> block to offer breakfasts, snacks or drinks after the meals step, and choose a
              collection for it. You can add more than one.
            </p>
            <H3>Macros panel</H3>
            <p>
              <B>Show "A day from this box"</B> divides the box's calories and macros by <B>Days a box covers</B>, so
              customers can see what a typical day looks like. Set the number of days to match how you sell, for
              example 5 for a working week.
            </p>
            <H3>Other options</H3>
            <ul className="list-disc space-y-2 pl-5">
              <li><B>Start with one of each meal</B> fills the box with one of every meal, for small menus.</li>
              <li><B>Go straight to checkout</B> skips the cart after the review step.</li>
              <li><B>Delivery note</B> shows under the total, for example your delivery charge.</li>
              <li><B>Show dietary filters</B> and <B>Filter tags</B> control the filter chips.</li>
            </ul>
          </Section>

          <Section id="subscriptions" eyebrow="Step 3 (optional)" title="Subscriptions">
            <p>
              Portion works with any subscription app that uses Shopify selling plans, including{" "}
              <B>Shopify Subscriptions</B>, <B>Appstle</B>, <B>Recharge</B> and <B>Seal</B>. Once your meals have a
              selling plan, a <B>One-off / Subscribe and save</B> choice appears automatically in the box builder and on
              product pages, with subscription prices on every card.
            </p>
            <Steps
              items={[
                <>Install your subscription app and create a plan, such as "Weekly, 10% off".</>,
                <>Add every meal, and any extras you want included, to that plan in the app.</>,
                <>That's it: the choice appears. If your meals have more than one plan, use the settings below to choose which one the box builder uses.</>,
              ]}
            />
            <Table
              head={["Setting", "Use it when"]}
              rows={[
                [<B key="b">Subscription plan ID</B>, "You want one exact plan for every meal. Paste the plan's ID, which your subscription app shows in its plan settings."],
                [<B key="b">Subscription plan name contains</B>, <>Your plans share a word, such as <Code>Weekly</Code>, and you don't have the ID.</>],
                ["Neither", "Each meal uses its first plan."],
              ]}
            />
            <p>
              On the product page, the <B>Purchase options</B> block shows the same choice. Turn on{" "}
              <B>Subscribe by default</B> to pre-select it.
            </p>
          </Section>

          <Section id="product" eyebrow="Meal pages" title="The meal product page">
            <p>
              The product page is built from blocks you can reorder or remove in the theme editor (
              <B>Products → Default product</B>).
            </p>
            <Table
              head={["Block", "What it does"]}
              rows={[
                ["Back link", "A link back to your box builder, for example \"Back to build your box\"."],
                ["Dietary tags", "Shows matching product tags as labels."],
                ["Title, Description, Text", "The meal name, a short or full description, and any extra text."],
                ["Price", "Price with sale badge and tax note."],
                ["Macros", "Calories, protein, carbs and fat per meal, with portion weight. Can highlight protein."],
                ["Variant picker", "Buttons or a dropdown for sizes."],
                ["Purchase options", "One-off or subscribe, when the meal has a selling plan."],
                ["Buy buttons", "Quantity, add to basket and the Buy it now button. Supports gift card recipients."],
                ["Build a box link", "A prompt to build a full box instead of buying one meal."],
                ["Collapsible tab", "Ingredients, allergens, heating instructions (from metafields), a page, or your own text."],
                ["Pickup availability, Share, Custom Liquid, Apps", "Local pickup, share links, your own code, and app blocks such as reviews."],
              ]}
            />
          </Section>

          <Section id="menu" eyebrow="Showing your food" title="Weekly menu & collections">
            <p>
              The <B>Weekly menu</B> section shows meal cards from a collection, with macros, dietary filter chips and an
              Add button. It's ideal on your home page. Use a collection like "This week's menu" and change its products
              each week; every page that uses it updates automatically.
            </p>
            <p>
              To control the order meals appear in, open the collection in your admin, set <B>Sort</B> to{" "}
              <B>Manually</B>, then drag them into place. Sold-out meals show as sold out and can't be added.
            </p>
            <p>
              Collection pages support Shopify's filters. Install the free <B>Shopify Search &amp; Discovery</B> app to
              choose which filters appear, such as product type, tags or price.
            </p>
          </Section>

          <Section id="sections" eyebrow="Building pages" title="Sections">
            <p>
              Add these to any page from the theme editor. Most have a colour scheme setting: default, surface, primary
              or accent.
            </p>
            <div className="grid gap-4 sm:grid-cols-3">
              <Card title="Meal prep">Hero, Weekly menu, Box builder, Featured product, Featured collection, Product recommendations.</Card>
              <Card title="Story & trust">Image with text, Multicolumn (great for "how it works"), Testimonials, Logo list, Collapsible content for FAQs.</Card>
              <Card title="Content">Rich text, Image banner, Video, Collection list, Blog posts, Newsletter, Contact form, Custom Liquid.</Card>
            </div>
            <p>
              The header and footer are section groups. The footer has brand, menu and newsletter blocks. The header
              supports a sticky option, dropdown menus, country and language selectors, and an announcement bar.
            </p>
          </Section>

          <Section id="settings" eyebrow="Your brand" title="Theme settings">
            <p>
              Open <B>Theme settings</B> (the cog icon) in the editor.
            </p>
            <Table
              head={["Group", "Settings"]}
              rows={[
                ["Logo", "Logo image, logo width and favicon."],
                ["Typography", "Heading font, body font and heading size."],
                ["Layout", "Page width, page margin, card corner radius and input corner radius."],
                ["Colours", "Background, surface, text, primary (buttons and accents) and accent colours, each with a matching text colour."],
                ["Meals", "The metafield namespace for nutrition. Change it if your meal data already uses a different namespace."],
                ["Cart", "Cart drawer or cart page."],
                ["Search", "Turn search suggestions on or off."],
                ["Social media", "Links shown in the footer."],
              ]}
            />
          </Section>

          <Section id="cart" eyebrow="Ordering" title="Cart & checkout">
            <p>
              Meals from the box builder arrive in the cart grouped by delivery day, with the day saved as a line item
              property you'll see on every order. Customers can change quantities in the cart drawer or on the cart page.
              Delivery charges, local delivery and pickup are set in <B>Settings → Shipping and delivery</B>.
            </p>
          </Section>

          <Section id="faq" eyebrow="Help" title="Troubleshooting">
            <Faq q="Macros aren't showing">
              Check the metafield definitions use the exact keys above, with the <Code>custom</Code> namespace (or the
              one set in theme settings), and that the type is Integer.
            </Faq>
            <Faq q="The Subscribe and save option doesn't appear">
              The meals must be added to a selling plan in your subscription app, and the app must be enabled. If you've
              set a <B>Subscription plan ID</B>, check it matches a plan the meals belong to.
            </Faq>
            <Faq q="Filter chips don't filter anything">
              The filter names in the section settings must match your product tags exactly, including capitals and
              spaces.
            </Faq>
            <Faq q="The box builder is empty">
              Choose a collection in the section's <B>Meals collection</B> setting, and make sure its products are active
              and available on the Online Store.
            </Faq>
            <Faq q="The countdown shows the wrong time">
              The countdown uses your store's time zone (<B>Settings → General</B>) and the cut-off day and hour in the
              section settings.
            </Faq>
            <Faq q="I want to change the theme's code">
              Custom code changes aren't covered by support. Duplicate your theme first (<B>Online Store → Themes → … →
              Duplicate</B>) so you can always go back, or <A href="/book">get a quote</A> and I'll make the change for
              you.
            </Faq>
          </Section>

          <Section id="support" eyebrow="Get in touch" title="Support">
            <p>Portion is made and supported by Lewis at CreatedByLewis, who builds meal prep stores on Shopify for a living.</p>
            <Note title="Send a support request">
              Use the <A href="/support">support form</A>. Add your store address and a screenshot, and you'll get an
              email confirming it arrived. I reply within two working days (UK time).
            </Note>
            <p>
              Support covers setting up the theme's features, questions about its settings and fixing theme bugs. It
              doesn't cover custom design changes or third-party apps.
            </p>
          </Section>
        </div>
      </div>
    </main>
  );
}

function TocList({ active, className }: { active: string; className?: string }) {
  return (
    <ol className={cn("space-y-1 text-sm", className)}>
      {SECTIONS.map(({ id, label }) => (
        <li key={id}>
          <a
            href={`#${id}`}
            aria-current={active === id ? "true" : undefined}
            className={cn(
              "flex min-h-10 items-center rounded-md px-3 transition-colors",
              active === id ? "bg-card text-ink" : "text-muted hover:text-ink",
            )}
          >
            {label}
          </a>
        </li>
      ))}
    </ol>
  );
}

function Section({ id, eyebrow, title, children }: { id: string; eyebrow: string; title: string; children: ReactNode }) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="scroll-mt-24 space-y-5">
      <p className="text-xs tracking-widest text-signal uppercase">{eyebrow}</p>
      <h2 id={`${id}-title`} className="font-display text-3xl leading-display font-medium text-ink sm:text-4xl">
        {title}
      </h2>
      {children}
    </section>
  );
}

function H3({ children }: { children: ReactNode }) {
  return <h3 className="pt-3 text-xl font-medium text-ink">{children}</h3>;
}

function B({ children }: { children: ReactNode }) {
  return <strong className="font-medium text-ink">{children}</strong>;
}

function Code({ children }: { children: ReactNode }) {
  return <code className="rounded bg-card px-1.5 py-0.5 font-mono text-[0.875em] text-ink">{children}</code>;
}

function A({ href, children }: { href: string; children: ReactNode }) {
  const cls = "text-ink underline decoration-signal decoration-2 underline-offset-4 hover:text-signal";
  if (href.startsWith("/")) {
    return (
      <Link to={href} className={cls}>
        {children}
      </Link>
    );
  }
  return (
    <a href={href} className={cls}>
      {children}
    </a>
  );
}

function Steps({ items }: { items: ReactNode[] }) {
  return (
    <ol className="space-y-3">
      {items.map((item, index) => (
        <li key={index} className="flex gap-4">
          <span
            aria-hidden="true"
            className="grid size-8 shrink-0 place-items-center rounded-full bg-signal font-display text-sm text-on-signal"
          >
            {index + 1}
          </span>
          <span className="pt-1">{item}</span>
        </li>
      ))}
    </ol>
  );
}

function Note({ title, tone = "info", children }: { title: string; tone?: "info" | "warn"; children: ReactNode }) {
  return (
    <div
      className={cn(
        "rounded-xl border bg-card p-5",
        tone === "warn" ? "border-[#d46a9a]/50" : "border-signal/50",
      )}
    >
      <p className="font-medium text-ink">{title}</p>
      <p className="mt-1">{children}</p>
    </div>
  );
}

function Card({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="rounded-xl border border-line bg-card p-5">
      <p className="font-medium text-ink">{title}</p>
      <p className="mt-2 text-sm">{children}</p>
    </div>
  );
}

function Table({ head, rows }: { head: string[]; rows: ReactNode[][] }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-line">
      <table className="w-full min-w-[34rem] border-collapse text-left text-sm">
        <thead className="bg-card text-ink">
          <tr>
            {head.map((cell) => (
              <th key={cell} scope="col" className="px-4 py-3 font-medium">
                {cell}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="border-t border-line">
              {row.map((cell, j) => (
                <td key={j} className={cn("px-4 py-3 align-top", j === 0 && "text-ink")}>
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Faq({ q, children }: { q: string; children: ReactNode }) {
  return (
    <details className="group rounded-xl border border-line bg-card">
      <summary className="flex min-h-12 cursor-pointer items-center justify-between gap-4 px-5 font-medium text-ink">
        {q}
        <span aria-hidden="true" className="text-muted transition-transform group-open:rotate-45">
          +
        </span>
      </summary>
      <p className="px-5 pb-5">{children}</p>
    </details>
  );
}

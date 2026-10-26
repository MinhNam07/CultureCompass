import { createRoot } from "react-dom/client";
import { countries } from "@/globe/countries";

const code = new URLSearchParams(window.location.search).get("country");
const country = countries.find((item) => item.code === code);
if (country) document.title = `${country.label} — CultureCompass`;

function CountryDetails() {
  if (!country) return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="font-serif text-4xl">Country not found</h1>
      <a className="mt-6 inline-block underline" href="index.html#destinations">Return to the globe</a>
    </main>
  );
  return (
    <main className="mx-auto max-w-6xl px-6 py-8 md:px-12 md:py-12">
      <a href="index.html#destinations" className="text-sm underline underline-offset-4 focus-visible:outline-2">Back to the globe</a>
      <header className="my-10 md:my-14">
        <div className="flex items-center gap-4">
          <img src={country.src} alt="" className="h-8 w-11 object-fill" />
          <h1 className="font-serif text-5xl md:text-7xl">{country.label}</h1>
        </div>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed">Begin with a moment of local culture in {country.place}. Look closely at the people, practices and details in this photograph.</p>
      </header>
      <figure>
        <img src={country.image} alt={country.alt} className="max-h-[640px] w-full object-cover" />
        <figcaption className="mt-3 text-sm leading-relaxed">
          {country.place} · <a className="underline underline-offset-4" href={country.sourceUrl} target="_blank" rel="noreferrer">Photo: {country.credit}</a>
        </figcaption>
      </figure>
      <div className="mt-12 grid gap-10 md:grid-cols-2 md:gap-16">
        <section>
          <h2 className="font-serif text-3xl">A closer look</h2>
          <p className="mt-4 text-base leading-8">{country.alt}</p>
          <p className="mt-4 text-base leading-8">This is one scene from {country.place}, not a portrait of an entire country. Customs and everyday life vary between places, communities and generations.</p>
        </section>
        <section>
          <h2 className="font-serif text-3xl">Explore with curiosity</h2>
          <ol className="mt-4 list-decimal space-y-3 pl-5 leading-8">
            <li>What actions, clothing, objects or materials can you observe?</li>
            <li>What would you need to ask someone from this community to understand the scene?</li>
            <li>Open the original photograph to check its description, location and context.</li>
          </ol>
          <a href={country.sourceUrl} target="_blank" rel="noreferrer" className="mt-5 inline-block rounded-md bg-[#65453B] px-5 py-3 text-white hover:bg-[#302720] focus-visible:outline-2 focus-visible:outline-offset-4">Read the photo’s source</a>
        </section>
      </div>
      <p className="mt-12 border-t border-[#302720]/20 pt-6 text-sm leading-7">This page is a visual introduction. Detailed cultural stories for this destination have not yet been researched for CultureCompass. <a href="vietnam.html" className="underline underline-offset-4">Explore our sourced stories about Vietnam, starting in Hà Nội.</a></p>
    </main>
  );
}

createRoot(document.getElementById("country-root")!).render(<CountryDetails />);

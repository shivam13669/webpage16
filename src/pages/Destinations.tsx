import { useLayoutEffect, useMemo, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { destinationIconMap, destinations } from "@/data/destinations";
import { ArrowRight, Calendar, MapPin, MapPinned, Star } from "lucide-react";
import { useCurrency } from "@/context/CurrencyContext";
import { parseINRStringToNumber } from "@/lib/currency";

const DestinationsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { formatFromINR } = useCurrency();

  // Ensure we start at the top of the page when navigating here to avoid
  // visual jumps/blinks caused by preserved scroll/restoration.
  useLayoutEffect(() => {
    if (location.pathname === "/destinations") {
      window.scrollTo({ top: 0, left: 0 });
    }
  }, [location.key, location.pathname]);

  const [activeSlug, setActiveSlug] = useState(destinations[0]?.slug ?? "");
  const activeDestination = useMemo(
    () => destinations.find((d) => d.slug === activeSlug) ?? destinations[0],
    [activeSlug]
  );

  const handleOpenPackage = (packageSlug: string) => {
    navigate(`/destinations/${activeDestination.slug}/${packageSlug}`);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />

      <main className="pt-24 pb-20">
        {/* Hero */}
        <section className="container mx-auto px-4 text-center">
          <div className="mx-auto max-w-3xl space-y-4">
            <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
              <MapPinned className="h-4 w-4" />
              Explore destinations crafted for storytellers
            </span>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              Curated journeys across the Himalayas
            </h1>
            <p className="text-lg text-muted-foreground">
              Choose from high-altitude odysseys, monastery circuits, rainforest trails, and cultural immersions designed by our expedition experts.
            </p>
          </div>
        </section>

        {/* Category Tabs */}
        <section className="container mx-auto px-4">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-3xl font-bold">Choose a destination</h2>
            </div>
            <Link to="/destinations" className="flex items-center gap-2 text-sm font-semibold text-primary">
              View all destinations
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="mt-8 flex flex-nowrap gap-3 overflow-x-auto pb-2 -mx-4 px-4 whitespace-nowrap snap-x snap-mandatory sm:mx-0 sm:px-0">
            {destinations.map((d) => {
              const Icon = destinationIconMap[d.icon];
              const active = d.slug === activeSlug;
              return (
                <button
                  key={d.slug}
                  onClick={() => setActiveSlug(d.slug)}
                  aria-pressed={active}
                  className={[
                    "inline-flex shrink-0 items-center justify-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition-colors snap-start whitespace-nowrap min-w-max",
                    active
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-transparent text-foreground border-border hover:border-primary/50 hover:text-primary",
                  ].join(" ")}
                >
                  <Icon className="h-4 w-4" />
                  <span className="font-medium">{d.name}</span>
                </button>
              );
            })}
          </div>
        </section>

        {/* Listing header */}
        <section className="container mx-auto px-4 mt-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Tours in {activeDestination.name}</h2>
              <p className="mt-2 max-w-2xl text-sm text-muted-foreground">{activeDestination.summary}</p>
            </div>
            <div className="flex flex-wrap gap-2 text-xs font-medium text-muted-foreground">
              <span className="rounded-full bg-muted px-3 py-1">Best time: {activeDestination.quickFacts.bestTime}</span>
              <span className="rounded-full bg-muted px-3 py-1">Start point: {activeDestination.quickFacts.startPoint}</span>
              <span className="rounded-full bg-muted px-3 py-1">Style: {activeDestination.quickFacts.travelStyle}</span>
            </div>
          </div>
        </section>

        {/* Packages grid */}
        <section className="container mx-auto px-4 mt-8">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {activeDestination.packages.map((pkg) => (
              <Card
                key={pkg.slug}
                role="link"
                tabIndex={0}
                aria-label={`View details for ${pkg.name}`}
                onClick={() => handleOpenPackage(pkg.slug)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    handleOpenPackage(pkg.slug);
                  }
                }}
                className="group flex h-full cursor-pointer flex-col overflow-hidden border border-border/60 bg-card/90 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:border-primary/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
              >
                {pkg.image && (
                  <div className="relative h-48 w-full overflow-hidden">
                    <img
                      src={pkg.image}
                      alt={pkg.name}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      loading="lazy"
                    />
                    <span className="absolute left-4 top-4 inline-flex items-center gap-1 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-foreground shadow">
                      <Calendar className="h-3.5 w-3.5" /> {pkg.duration}
                    </span>
                    <span className="absolute right-4 top-4 inline-flex items-center gap-1 rounded-full bg-emerald-500 px-2.5 py-1 text-xs font-semibold text-white shadow">
                      <Star className="h-3.5 w-3.5 fill-white" /> {pkg.rating.toFixed ? pkg.rating.toFixed(1) : pkg.rating}
                      <span className="text-white/80">({pkg.reviews})</span>
                    </span>
                  </div>
                )}

                <CardContent className="p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{pkg.duration}</p>
                      <h3 className="mt-1 text-lg font-semibold leading-snug">{pkg.name}</h3>
                    </div>
                    <div className="hidden sm:flex items-center gap-1 rounded-full bg-emerald-100 px-2 py-1 text-xs font-semibold text-emerald-700">
                      <Star className="h-3.5 w-3.5 fill-current" />
                      <span>{pkg.rating.toFixed ? pkg.rating.toFixed(1) : pkg.rating}</span>
                      <span className="text-muted-foreground">({pkg.reviews})</span>
                    </div>
                  </div>

                  <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4" /> {activeDestination.region}
                  </div>

                  <p className="mt-3 text-sm text-muted-foreground">{pkg.description}</p>

                  <div className="mt-5 flex flex-wrap items-baseline justify-between gap-3">
                    <div className="flex items-baseline gap-2">
                      <span className="text-xl font-semibold text-foreground">{formatFromINR(parseINRStringToNumber(pkg.price) ?? 0)}</span>
                      {pkg.oldPrice && (
                        <span className="text-sm text-muted-foreground line-through">{formatFromINR(parseINRStringToNumber(pkg.oldPrice) ?? 0)}</span>
                      )}
                      {pkg.badge && (
                        <span className="rounded-full bg-emerald-100 px-2 py-1 text-[11px] font-semibold text-emerald-700">{pkg.badge}</span>
                      )}
                    </div>

                    <div className="flex w-full gap-2 sm:w-auto">
                      <Button
                        asChild
                        variant="secondary"
                        className="flex-1 sm:flex-none"
                        onClick={(event) => event.stopPropagation()}
                      >
                        <Link
                          to={`/destinations/${activeDestination.slug}/${pkg.slug}`}
                          onClick={(event) => event.stopPropagation()}
                        >
                          View itinerary
                          <ArrowRight className="h-4 w-4" />
                        </Link>
                      </Button>
                      <Button
                        variant="outline"
                        className="flex-1 sm:flex-none"
                        onClick={(event) => event.stopPropagation()}
                      >
                        Request callback
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default DestinationsPage;

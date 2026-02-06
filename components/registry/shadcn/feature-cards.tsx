"use client";

import { cn } from "@/lib/utils/cn";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Palette, Code, Rocket, Settings, Users, Lock } from "lucide-react";

interface ShadcnFeatureCardsProps {
  headline?: string;
  description?: string;
  features?: { title: string; description: string; icon: string }[];
  className?: string;
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  palette: Palette,
  code: Code,
  rocket: Rocket,
  settings: Settings,
  users: Users,
  lock: Lock,
};

export default function ShadcnFeatureCards({
  headline = "Built for teams of all sizes",
  description = "From solo developers to enterprise organizations, we have you covered.",
  features = [
    {
      title: "Beautiful Design",
      description:
        "Professionally crafted components that look great out of the box.",
      icon: "palette",
    },
    {
      title: "Clean Code",
      description: "Well-structured, typed, and documented code you can trust.",
      icon: "code",
    },
    {
      title: "Fast Shipping",
      description: "Go from idea to production in record time.",
      icon: "rocket",
    },
    {
      title: "Customizable",
      description: "Fully configurable to match your brand and requirements.",
      icon: "settings",
    },
    {
      title: "Team Ready",
      description: "Built-in collaboration features for seamless teamwork.",
      icon: "users",
    },
    {
      title: "Secure",
      description: "Enterprise-grade security with SOC2 compliance.",
      icon: "lock",
    },
  ],
  className,
}: ShadcnFeatureCardsProps) {
  return (
    <section className={cn("py-16 px-4 md:py-24", className)}>
      <div className="mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {headline}
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            {description}
          </p>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => {
            const Icon = iconMap[feature.icon] || Rocket;
            return (
              <Card
                key={index}
                className="border bg-background hover:shadow-md transition-shadow"
              >
                <CardHeader>
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 mb-2">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}

"use client";

import { Github, Linkedin, Heart, Rocket, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export function CreativeFooter() {
  return (
    <footer className="w-full py-8">
      <Card className="max-w-6xl mx-auto border-border/50 bg-card/80 backdrop-blur-sm">
        <CardContent className="p-6">
          <div className="text-center space-y-6">
            {/* Título creativo */}
            <div className="space-y-2">
              <div className="flex items-center justify-center gap-2 text-2xl font-bold">
                <Rocket className="h-6 w-6 text-primary animate-float" />
                <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                  Hecho con
                </span>
                <Heart className="h-5 w-5 text-red-500 animate-pulse" />
                <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                  en el espacio
                </span>
                <Star className="h-6 w-6 text-yellow-400 animate-twinkle" />
              </div>
              <p className="text-muted-foreground text-sm">
                Una calculadora intergaláctica para explorar la gravedad del universo
              </p>
            </div>
            {/* Enlaces sociales con diseño creativo */}
            <div className="flex justify-center gap-4">
              <Button
                variant="outline"
                size="lg"
                className="group relative overflow-hidden bg-gradient-to-r from-gray-900 to-gray-800 hover:from-gray-800 hover:to-gray-700 text-white border-gray-700 hover:border-gray-600 transition-all duration-300 hover:scale-105"
                asChild
              >
                <a
                  href="https://github.com/joaquinjachow"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  <Github className="h-5 w-5 group-hover:rotate-12 transition-transform duration-300" />
                  <span>GitHub</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                </a>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="group relative overflow-hidden bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white border-blue-500 hover:border-blue-400 transition-all duration-300 hover:scale-105"
                asChild
              >
                <a
                  href="https://www.linkedin.com/in/joaquin-jachow/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  <Linkedin className="h-5 w-5 group-hover:rotate-12 transition-transform duration-300" />
                  <span>LinkedIn</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                </a>
              </Button>
            </div>
            {/* Información adicional */}
            <div className="pt-4 border-t border-border/50">
              <p className="text-xs text-muted-foreground">
                © 2025 Calculadora de Peso Planetario • Desarrollado con Next.js, TypeScript y Tailwind CSS
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Explora el universo, descubre la gravedad, calcula tu peso en cualquier planeta
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </footer>
  );
}
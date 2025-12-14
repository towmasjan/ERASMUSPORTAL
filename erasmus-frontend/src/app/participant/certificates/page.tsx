'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Award, Download, ExternalLink } from 'lucide-react';

const certificates = [
  {
    id: 1,
    eventName: 'Intercultural Dialogue Workshop',
    date: 'Lipiec 2024',
    location: 'Praga, Czechy',
    type: 'Youthpass',
    skills: ['Komunikacja', 'Praca zespołowa', 'Różnorodność kulturowa'],
  },
];

export default function CertificatesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <Award className="w-7 h-7 text-primary" />
          Moje certyfikaty
        </h1>
        <p className="text-muted-foreground">Twoje certyfikaty Youthpass z ukończonych wymian</p>
      </div>

      {certificates.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2">
          {certificates.map((cert) => (
            <Card key={cert.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <Badge className="mb-2">{cert.type}</Badge>
                    <CardTitle>{cert.eventName}</CardTitle>
                    <CardDescription>{cert.location} • {cert.date}</CardDescription>
                  </div>
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Award className="w-6 h-6 text-primary" />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <p className="text-sm font-medium mb-2">Rozwinięte kompetencje:</p>
                  <div className="flex flex-wrap gap-2">
                    {cert.skills.map((skill) => (
                      <Badge key={skill} variant="secondary" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" className="flex-1">
                    <Download className="w-4 h-4 mr-2" />
                    Pobierz PDF
                  </Button>
                  <Button size="sm" variant="outline">
                    <ExternalLink className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="py-12 text-center">
            <Award className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
            <h3 className="font-semibold text-lg mb-2">Brak certyfikatów</h3>
            <p className="text-muted-foreground mb-4">
              Po ukończeniu wymiany młodzieżowej otrzymasz certyfikat Youthpass
            </p>
            <Button variant="outline">Dowiedz się więcej o Youthpass</Button>
          </CardContent>
        </Card>
      )}

      <Card className="bg-gradient-to-br from-primary/5 to-secondary/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="w-5 h-5" />
            Czym jest Youthpass?
          </CardTitle>
        </CardHeader>
        <CardContent className="text-muted-foreground space-y-2">
          <p>
            Youthpass to europejski certyfikat potwierdzający udział w projektach programu Erasmus+ 
            oraz nabyte podczas nich kompetencje kluczowe.
          </p>
          <p>
            Jest uznawany w całej Europie i może być cennym dodatkiem do Twojego CV.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}


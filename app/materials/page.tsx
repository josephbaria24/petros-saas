import { MainLayout } from "@/components/layouts/main-layout"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Download, FileText, BookOpen } from "lucide-react"
import { mockMaterials } from "@/lib/mock-data"

export default function MaterialsPage() {
  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between animate-slide-up">
          <div>
            <h1 className="text-3xl font-bold text-foreground">E-Learning Materials</h1>
            <p className="text-muted-foreground mt-1">Access study materials, guides, and resources</p>
          </div>
        </div>

        {/* Search */}
        <div className="relative animate-slide-up" style={{ animationDelay: "0.1s" }}>
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Search materials..." className="pl-10" />
        </div>

        {/* Tabs */}
        <Tabs defaultValue="all" className="animate-slide-up" style={{ animationDelay: "0.2s" }}>
          <TabsList>
            <TabsTrigger value="all">All Materials</TabsTrigger>
            <TabsTrigger value="eilts">EILTS</TabsTrigger>
            <TabsTrigger value="toefl">TOEFL</TabsTrigger>
            <TabsTrigger value="technical">Technical</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-6">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {mockMaterials.map((material, index) => (
                <Card
                  key={material.id}
                  className="p-6 transition-smooth hover:shadow-lg animate-slide-up"
                  style={{ animationDelay: `${0.1 * index}s` }}
                >
                  <div className="space-y-4">
                    <div className="flex items-start justify-between">
                      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                        {material.type === "EILTS" || material.type === "TOEFL" ? (
                          <BookOpen className="h-6 w-6 text-primary" />
                        ) : (
                          <FileText className="h-6 w-6 text-primary" />
                        )}
                      </div>
                      <Badge variant="secondary">{material.type}</Badge>
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-lg font-semibold text-foreground line-clamp-1">{material.title}</h3>
                      <p className="text-sm text-muted-foreground line-clamp-2">{material.description}</p>
                    </div>

                    <div className="flex flex-wrap gap-1">
                      {material.tags.slice(0, 3).map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    <Button className="w-full gap-2 bg-transparent" variant="outline">
                      <Download className="h-4 w-4" />
                      Download
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="eilts" className="mt-6">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {mockMaterials
                .filter((m) => m.type === "EILTS")
                .map((material) => (
                  <Card key={material.id} className="p-6">
                    <div className="space-y-4">
                      <div className="flex items-start justify-between">
                        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                          <BookOpen className="h-6 w-6 text-primary" />
                        </div>
                        <Badge variant="secondary">{material.type}</Badge>
                      </div>
                      <div className="space-y-2">
                        <h3 className="text-lg font-semibold text-foreground">{material.title}</h3>
                        <p className="text-sm text-muted-foreground">{material.description}</p>
                      </div>
                      <Button className="w-full gap-2 bg-transparent" variant="outline">
                        <Download className="h-4 w-4" />
                        Download
                      </Button>
                    </div>
                  </Card>
                ))}
            </div>
          </TabsContent>

          <TabsContent value="toefl" className="mt-6">
            <div className="text-center py-12">
              <p className="text-muted-foreground">TOEFL materials coming soon</p>
            </div>
          </TabsContent>

          <TabsContent value="technical" className="mt-6">
            <div className="text-center py-12">
              <p className="text-muted-foreground">Technical materials coming soon</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  )
}

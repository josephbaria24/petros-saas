'use client'

import { useEffect, useState } from "react"
import { MainLayout } from "@/components/layouts/main-layout"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Download, FileText, BookOpen } from "lucide-react"
import { supabase } from "@/lib/supabase-client"

interface Material {
  id: string
  title: string
  description?: string
  type?: string
  tags?: string[]
  file_url?: string
}

export default function MaterialsPage() {
  const [materials, setMaterials] = useState<Material[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchMaterials = async () => {
      const { data, error } = await supabase.from("materials").select("*").order("updated_at", { ascending: false })
      if (error) console.error("Failed to load materials:", error)
      else setMaterials(data)
      setLoading(false)
    }

    fetchMaterials()
  }, [])

  const renderCard = (material: Material, index: number) => (
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
          <Badge variant="secondary">{material.type || "Other"}</Badge>
        </div>
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-foreground line-clamp-1">{material.title}</h3>
          <p className="text-sm text-muted-foreground line-clamp-2">{material.description}</p>
        </div>
        <div className="flex flex-wrap gap-1">
          {material.tags?.slice(0, 3).map((tag) => (
            <Badge key={tag} variant="outline" className="text-xs">{tag}</Badge>
          ))}
        </div>
        <a href={material.file_url} download target="_blank" rel="noopener noreferrer">
          <Button className="w-full gap-2 bg-transparent" variant="outline">
            <Download className="h-4 w-4" />
            Download
          </Button>
        </a>
      </div>
    </Card>
  )

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between animate-slide-up">
          <div>
            <h1 className="text-3xl font-bold text-foreground">E-Learning Materials</h1>
            <p className="text-muted-foreground mt-1">Access study materials, guides, and resources</p>
          </div>
        </div>

        <div className="relative animate-slide-up" style={{ animationDelay: "0.1s" }}>
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Search materials..." className="pl-10" />
        </div>

        <Tabs defaultValue="all" className="animate-slide-up" style={{ animationDelay: "0.2s" }}>
          <TabsList>
            <TabsTrigger value="all">All Materials</TabsTrigger>
            <TabsTrigger value="EILTS">EILTS</TabsTrigger>
            <TabsTrigger value="TOEFL">TOEFL</TabsTrigger>
            <TabsTrigger value="Technical">Technical</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-6">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {loading
                ? <p className="text-muted-foreground col-span-full text-center">Loading materials...</p>
                : materials.map((material, i) => renderCard(material, i))}
            </div>
          </TabsContent>

          {["EILTS", "TOEFL", "Technical"].map(type => (
            <TabsContent value={type} key={type} className="mt-6">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {materials.filter(m => m.type === type).length === 0 ? (
                  <p className="text-muted-foreground col-span-full text-center">No {type} materials found.</p>
                ) : (
                  materials
                    .filter(m => m.type === type)
                    .map((material, i) => renderCard(material, i))
                )}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </MainLayout>
  )
}

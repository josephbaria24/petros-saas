'use client'
import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabase-client"
import { UploadMaterialModal } from "@/components/admin/materials/upload-material-modal"
import { MainLayout } from "@/components/layouts/main-layout"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Plus, MoreVertical, Edit, Trash2, Download, Upload } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"


interface Material {
  id: string
  title: string
  description: string
  type: string
  category: string
  tags: string[]
  file_url: string
  updated_at: string
}

export default function AdminMaterialsPage() {

  const [materials, setMaterials] = useState<Material[]>([])

const fetchMaterials = async () => {
  const { data, error } = await supabase.from('materials').select('*').order('updated_at', { ascending: false })
  if (!error) setMaterials(data as Material[])
}

useEffect(() => {
  fetchMaterials()
}, [])



  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between animate-slide-up">
          <div>
            <h1 className="text-3xl font-bold text-foreground">E-Learning Materials</h1>
            <p className="text-muted-foreground mt-1">Manage EILTS, TOEFL, and other learning resources</p>
          </div>
          <UploadMaterialModal onUploaded={fetchMaterials} />
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
            <TabsTrigger value="soft-skills">Soft Skills</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-6">
            <Card>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left p-4 text-sm font-semibold text-muted-foreground">Material</th>
                      <th className="text-left p-4 text-sm font-semibold text-muted-foreground">Type</th>
                      <th className="text-left p-4 text-sm font-semibold text-muted-foreground">Category</th>
                      <th className="text-left p-4 text-sm font-semibold text-muted-foreground">Tags</th>
                      <th className="text-left p-4 text-sm font-semibold text-muted-foreground">Updated</th>
                      <th className="text-right p-4 text-sm font-semibold text-muted-foreground">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                  {materials.map((material) => (
                      <tr
                        key={material.id}
                        className="border-b border-border last:border-0 hover:bg-accent/50 transition-colors"
                      >
                        <td className="p-4">
                          <div>
                            <p className="font-medium text-foreground">{material.title}</p>
                            <p className="text-sm text-muted-foreground line-clamp-1">{material.description}</p>
                          </div>
                        </td>
                        <td className="p-4">
                          <Badge variant="default">{material.type}</Badge>
                        </td>
                        <td className="p-4">
                          <span className="text-sm text-foreground">{material.category}</span>
                        </td>
                        <td className="p-4">
                          <div className="flex flex-wrap gap-1">
                            {material.tags.slice(0, 2).map((tag) => (
                              <Badge key={tag} variant="outline" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                            {material.tags.length > 2 && (
                              <Badge variant="outline" className="text-xs">
                                +{material.tags.length - 2}
                              </Badge>
                            )}
                          </div>
                        </td>
                        <td className="p-4">
                          <span className="text-sm text-muted-foreground">
                          {new Date(material.updated_at).toLocaleDateString()}
                          </span>
                        </td>
                        <td className="p-4">
                          <div className="flex justify-end">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <MoreVertical className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>
                                  <Download className="h-4 w-4 mr-2" />
                                  Download
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Edit className="h-4 w-4 mr-2" />
                                  Edit
                                </DropdownMenuItem>
                                <DropdownMenuItem className="text-destructive">
                                  <Trash2 className="h-4 w-4 mr-2" />
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="eilts" className="mt-6">
            <Card>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left p-4 text-sm font-semibold text-muted-foreground">Material</th>
                      <th className="text-left p-4 text-sm font-semibold text-muted-foreground">Category</th>
                      <th className="text-left p-4 text-sm font-semibold text-muted-foreground">Tags</th>
                      <th className="text-left p-4 text-sm font-semibold text-muted-foreground">Updated</th>
                      <th className="text-right p-4 text-sm font-semibold text-muted-foreground">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {materials
                      .filter((m) => m.type === "EILTS")
                      .map((material) => (
                        <tr
                          key={material.id}
                          className="border-b border-border last:border-0 hover:bg-accent/50 transition-colors"
                        >
                          <td className="p-4">
                            <div>
                              <p className="font-medium text-foreground">{material.title}</p>
                              <p className="text-sm text-muted-foreground">{material.description}</p>
                            </div>
                          </td>
                          <td className="p-4">
                            <span className="text-sm text-foreground">{material.category}</span>
                          </td>
                          <td className="p-4">
                            <div className="flex flex-wrap gap-1">
                              {material.tags.map((tag) => (
                                <Badge key={tag} variant="outline" className="text-xs">
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                          </td>
                          <td className="p-4">
                            <span className="text-sm text-muted-foreground">
                            {new Date(material.updated_at).toLocaleDateString()}
                            </span>
                          </td>
                          <td className="p-4">
                            <div className="flex justify-end gap-2">
                              <Button variant="ghost" size="icon">
                                <Download className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon">
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon">
                                <Trash2 className="h-4 w-4 text-destructive" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="toefl" className="mt-6">
            <Card className="p-12 text-center">
              <Upload className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">No TOEFL Materials Yet</h3>
              <p className="text-sm text-muted-foreground mb-4">Upload your first TOEFL learning material</p>
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                Upload Material
              </Button>
            </Card>
          </TabsContent>

          <TabsContent value="technical" className="mt-6">
            <Card>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left p-4 text-sm font-semibold text-muted-foreground">Material</th>
                      <th className="text-left p-4 text-sm font-semibold text-muted-foreground">Category</th>
                      <th className="text-left p-4 text-sm font-semibold text-muted-foreground">Tags</th>
                      <th className="text-left p-4 text-sm font-semibold text-muted-foreground">Updated</th>
                      <th className="text-right p-4 text-sm font-semibold text-muted-foreground">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {materials
                      .filter((m) => m.type === "Technical")
                      .map((material) => (
                        <tr
                          key={material.id}
                          className="border-b border-border last:border-0 hover:bg-accent/50 transition-colors"
                        >
                          <td className="p-4">
                            <div>
                              <p className="font-medium text-foreground">{material.title}</p>
                              <p className="text-sm text-muted-foreground">{material.description}</p>
                            </div>
                          </td>
                          <td className="p-4">
                            <span className="text-sm text-foreground">{material.category}</span>
                          </td>
                          <td className="p-4">
                            <div className="flex flex-wrap gap-1">
                              {material.tags.map((tag) => (
                                <Badge key={tag} variant="outline" className="text-xs">
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                          </td>
                          <td className="p-4">
                            <span className="text-sm text-muted-foreground">
                            {new Date(material.updated_at).toLocaleDateString()}
                            </span>
                          </td>
                          <td className="p-4">
                            <div className="flex justify-end gap-2">
                              <Button variant="ghost" size="icon">
                                <Download className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon">
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon">
                                <Trash2 className="h-4 w-4 text-destructive" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="soft-skills" className="mt-6">
            <Card className="p-12 text-center">
              <Upload className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">No Soft Skills Materials Yet</h3>
              <p className="text-sm text-muted-foreground mb-4">Upload your first soft skills learning material</p>
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                Upload Material
              </Button>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Upload Section */}
        <Card className="p-6 animate-slide-up" style={{ animationDelay: "0.3s" }}>
          <h2 className="text-xl font-semibold text-foreground mb-4">Quick Upload</h2>
          <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary transition-colors cursor-pointer">
            <Upload className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <p className="text-sm font-medium text-foreground mb-1">Click to upload or drag and drop</p>
            <p className="text-xs text-muted-foreground">PDF, DOC, DOCX, PPT, PPTX (max. 50MB)</p>
          </div>
        </Card>
      </div>
    </MainLayout>
  )
}

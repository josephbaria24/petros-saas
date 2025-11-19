//app\training\page.tsx
import { MainLayout } from "@/components/layouts/main-layout"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, Users, Video } from "lucide-react"
import { mockTrainingSessions } from "@/lib/mock-data"

export default function TrainingPage() {
  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="animate-slide-up">
          <h1 className="text-3xl font-bold text-foreground">Training Sessions</h1>
          <p className="text-muted-foreground mt-1">View and manage your scheduled training sessions</p>
        </div>

        {/* Upcoming Sessions */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-foreground animate-slide-up" style={{ animationDelay: "0.1s" }}>
            Upcoming Sessions
          </h2>

          <div className="grid gap-4 md:grid-cols-2">
            {mockTrainingSessions.map((session, index) => (
              <Card
                key={session.id}
                className="p-6 transition-smooth hover:shadow-lg animate-slide-up"
                style={{ animationDelay: `${0.1 * (index + 2)}s` }}
              >
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <h3 className="text-lg font-semibold text-foreground">{session.title}</h3>
                      <p className="text-sm text-muted-foreground">with {session.instructor}</p>
                    </div>
                    <Badge variant={session.status === "upcoming" ? "default" : "secondary"} className="capitalize">
                      {session.status}
                    </Badge>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      <span>{session.scheduledDate.toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      <span>
                        {session.scheduledDate.toLocaleTimeString()} ({session.duration} min)
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Users className="h-4 w-4" />
                      <span>
                        {session.participants}/{session.maxParticipants} participants
                      </span>
                    </div>
                  </div>

                  <div className="flex gap-2 pt-2">
                    <Button className="flex-1 gap-2">
                      <Video className="h-4 w-4" />
                      Join Session
                    </Button>
                    <Button variant="outline">Details</Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Past Sessions */}
        <div className="space-y-4 animate-slide-up" style={{ animationDelay: "0.4s" }}>
          <h2 className="text-xl font-semibold text-foreground">Past Sessions</h2>
          <Card className="p-8 text-center">
            <p className="text-muted-foreground">No past sessions to display</p>
          </Card>
        </div>
      </div>
    </MainLayout>
  )
}

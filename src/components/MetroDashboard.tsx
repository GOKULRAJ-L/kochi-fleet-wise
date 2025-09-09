import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import OptimizationPanel from '@/components/OptimizationPanel';
import { 
  Train, 
  Activity, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  Settings, 
  Zap,
  MapPin,
  Wrench,
  Star,
  BarChart3,
  PlayCircle,
  PauseCircle
} from 'lucide-react';

interface TrainsetStatus {
  id: string;
  number: string;
  status: 'operational' | 'standby' | 'maintenance' | 'critical';
  fitness: {
    rollingStock: boolean;
    signalling: boolean;
    telecom: boolean;
  };
  jobCards: {
    open: number;
    total: number;
  };
  branding: {
    priority: 'high' | 'medium' | 'low';
    exposure: number;
    target: number;
  };
  mileage: {
    current: number;
    target: number;
    variance: number;
  };
  cleaning: {
    scheduled: boolean;
    priority: number;
  };
  stablingBay: {
    current: string;
    optimal: string;
    shuntingTime: number;
  };
  lastUpdated: Date;
  recommendedAction: 'induct' | 'standby' | 'maintenance';
  confidenceScore: number;
}

const MetroDashboard: React.FC = () => {
  const [trainsets, setTrainsets] = useState<TrainsetStatus[]>([]);
  const [isSimulating, setIsSimulating] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  
  // Initialize dummy data
  useEffect(() => {
    const generateTrainsetData = (): TrainsetStatus[] => {
      return Array.from({ length: 25 }, (_, i) => {
        const trainNumber = `KMRL-${String(i + 1).padStart(3, '0')}`;
        const statuses: TrainsetStatus['status'][] = ['operational', 'standby', 'maintenance', 'critical'];
        const status = statuses[Math.floor(Math.random() * statuses.length)];
        
        return {
          id: `train-${i + 1}`,
          number: trainNumber,
          status,
          fitness: {
            rollingStock: Math.random() > 0.1,
            signalling: Math.random() > 0.05,
            telecom: Math.random() > 0.08,
          },
          jobCards: {
            open: Math.floor(Math.random() * 5),
            total: Math.floor(Math.random() * 10) + 5,
          },
          branding: {
            priority: ['high', 'medium', 'low'][Math.floor(Math.random() * 3)] as 'high' | 'medium' | 'low',
            exposure: Math.floor(Math.random() * 100),
            target: 85,
          },
          mileage: {
            current: Math.floor(Math.random() * 50000) + 10000,
            target: 45000,
            variance: Math.floor(Math.random() * 10000) - 5000,
          },
          cleaning: {
            scheduled: Math.random() > 0.3,
            priority: Math.floor(Math.random() * 5) + 1,
          },
          stablingBay: {
            current: `Bay-${Math.floor(Math.random() * 8) + 1}`,
            optimal: `Bay-${Math.floor(Math.random() * 8) + 1}`,
            shuntingTime: Math.floor(Math.random() * 30) + 5,
          },
          lastUpdated: new Date(),
          recommendedAction: ['induct', 'standby', 'maintenance'][Math.floor(Math.random() * 3)] as 'induct' | 'standby' | 'maintenance',
          confidenceScore: Math.floor(Math.random() * 30) + 70,
        };
      });
    };
    
    setTrainsets(generateTrainsetData());
  }, []);

  // Update current time
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);

  const getStatusColor = (status: TrainsetStatus['status']) => {
    switch (status) {
      case 'operational': return 'success';
      case 'standby': return 'info';
      case 'maintenance': return 'warning';
      case 'critical': return 'danger';
    }
  };

  const getStatusIcon = (status: TrainsetStatus['status']) => {
    switch (status) {
      case 'operational': return CheckCircle;
      case 'standby': return Clock;
      case 'maintenance': return Wrench;
      case 'critical': return AlertTriangle;
    }
  };

  const getFitnessScore = (fitness: TrainsetStatus['fitness']) => {
    const scores = Object.values(fitness);
    return Math.round((scores.filter(Boolean).length / scores.length) * 100);
  };

  const criticalAlerts = trainsets.filter(t => t.status === 'critical').length;
  const readyForService = trainsets.filter(t => t.recommendedAction === 'induct').length;
  const maintenanceRequired = trainsets.filter(t => t.recommendedAction === 'maintenance').length;

  return (
    <div className="min-h-screen bg-background metro-grid-bg p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Train className="h-8 w-8 text-primary" />
              <div>
                <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                  KMRL Fleet Management
                </h1>
                <p className="text-muted-foreground">Intelligent Trainset Induction Planning System</p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <p className="text-sm text-muted-foreground">Current Time</p>
              <p className="text-lg font-mono text-primary">
                {currentTime.toLocaleTimeString('en-IN', { timeZone: 'Asia/Kolkata' })} IST
              </p>
            </div>
            
            <Button 
              onClick={() => setIsSimulating(!isSimulating)}
              variant={isSimulating ? "destructive" : "default"}
              className="flex items-center space-x-2"
            >
              {isSimulating ? <PauseCircle className="h-4 w-4" /> : <PlayCircle className="h-4 w-4" />}
              <span>{isSimulating ? 'Stop' : 'Start'} Simulation</span>
            </Button>
          </div>
        </div>

        {/* Critical Alerts */}
        {criticalAlerts > 0 && (
          <Alert className="border-danger bg-danger/10">
            <AlertTriangle className="h-4 w-4 text-danger" />
            <AlertDescription className="text-danger">
              <strong>{criticalAlerts} trainset(s)</strong> require immediate attention before induction.
            </AlertDescription>
          </Alert>
        )}
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card className="metro-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground flex items-center">
              <CheckCircle className="h-4 w-4 mr-2 text-success" />
              Ready for Service
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-success">{readyForService}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {Math.round((readyForService / trainsets.length) * 100)}% of fleet
            </p>
          </CardContent>
        </Card>

        <Card className="metro-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground flex items-center">
              <Clock className="h-4 w-4 mr-2 text-info" />
              On Standby
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-info">
              {trainsets.filter(t => t.recommendedAction === 'standby').length}
            </div>
            <p className="text-xs text-muted-foreground mt-1">Available for backup</p>
          </CardContent>
        </Card>

        <Card className="metro-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground flex items-center">
              <Wrench className="h-4 w-4 mr-2 text-warning" />
              Maintenance Queue
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-warning">{maintenanceRequired}</div>
            <p className="text-xs text-muted-foreground mt-1">Scheduled for IBL</p>
          </CardContent>
        </Card>

        <Card className="metro-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground flex items-center">
              <Activity className="h-4 w-4 mr-2 text-primary" />
              Fleet Availability
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-primary">
              {Math.round(((trainsets.length - criticalAlerts) / trainsets.length) * 100)}%
            </div>
            <p className="text-xs text-muted-foreground mt-1">Target: 95%</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="fleet" className="space-y-6">
        <TabsList className="bg-surface border border-border">
          <TabsTrigger value="fleet" className="flex items-center space-x-2">
            <Train className="h-4 w-4" />
            <span>Fleet Overview</span>
          </TabsTrigger>
          <TabsTrigger value="optimization" className="flex items-center space-x-2">
            <BarChart3 className="h-4 w-4" />
            <span>Optimization</span>
          </TabsTrigger>
          <TabsTrigger value="analytics" className="flex items-center space-x-2">
            <Activity className="h-4 w-4" />
            <span>Analytics</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="fleet" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
            {trainsets.map((trainset) => {
              const StatusIcon = getStatusIcon(trainset.status);
              const fitnessScore = getFitnessScore(trainset.fitness);
              
              return (
                <Card key={trainset.id} className="metro-card hover:shadow-elevated transition-all duration-300">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg font-bold">{trainset.number}</CardTitle>
                      <div className="flex items-center space-x-2">
                        <StatusIcon className={`h-5 w-5 text-${getStatusColor(trainset.status)}`} />
                        <Badge variant={trainset.status === 'operational' ? 'default' : 'secondary'}>
                          {trainset.status.toUpperCase()}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    {/* Fitness Certificates */}
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">Fitness Score</span>
                        <span className="text-sm text-muted-foreground">{fitnessScore}%</span>
                      </div>
                      <Progress value={fitnessScore} className="h-2" />
                      <div className="flex items-center space-x-4 mt-2 text-xs">
                        <div className={`flex items-center space-x-1 ${trainset.fitness.rollingStock ? 'text-success' : 'text-danger'}`}>
                          <div className={`w-2 h-2 rounded-full ${trainset.fitness.rollingStock ? 'bg-success' : 'bg-danger'}`} />
                          <span>RS</span>
                        </div>
                        <div className={`flex items-center space-x-1 ${trainset.fitness.signalling ? 'text-success' : 'text-danger'}`}>
                          <div className={`w-2 h-2 rounded-full ${trainset.fitness.signalling ? 'bg-success' : 'bg-danger'}`} />
                          <span>SIG</span>
                        </div>
                        <div className={`flex items-center space-x-1 ${trainset.fitness.telecom ? 'text-success' : 'text-danger'}`}>
                          <div className={`w-2 h-2 rounded-full ${trainset.fitness.telecom ? 'bg-success' : 'bg-danger'}`} />
                          <span>TEL</span>
                        </div>
                      </div>
                    </div>

                    {/* Job Cards */}
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Job Cards</span>
                      <span className={`font-medium ${trainset.jobCards.open > 0 ? 'text-warning' : 'text-success'}`}>
                        {trainset.jobCards.open} open / {trainset.jobCards.total} total
                      </span>
                    </div>

                    {/* Branding Priority */}
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center space-x-1">
                        <Star className="h-3 w-3" />
                        <span className="text-muted-foreground">Branding</span>
                      </div>
                      <Badge 
                        variant={trainset.branding.priority === 'high' ? 'destructive' : 
                                trainset.branding.priority === 'medium' ? 'default' : 'secondary'}
                        className="text-xs"
                      >
                        {trainset.branding.priority}
                      </Badge>
                    </div>

                    {/* Stabling Info */}
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center space-x-1">
                        <MapPin className="h-3 w-3" />
                        <span className="text-muted-foreground">Position</span>
                      </div>
                      <span className="font-medium">{trainset.stablingBay.current}</span>
                    </div>

                    {/* Recommendation */}
                    <div className="pt-2 border-t border-border">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Recommendation</span>
                        <Badge 
                          variant={trainset.recommendedAction === 'induct' ? 'default' : 
                                  trainset.recommendedAction === 'standby' ? 'secondary' : 'destructive'}
                        >
                          {trainset.recommendedAction.toUpperCase()}
                        </Badge>
                      </div>
                      <div className="mt-1">
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <span>Confidence</span>
                          <span>{trainset.confidenceScore}%</span>
                        </div>
                        <Progress value={trainset.confidenceScore} className="h-1 mt-1" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="optimization" className="space-y-6">
          <OptimizationPanel />
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="metro-card">
              <CardHeader>
                <CardTitle>Historical Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-muted-foreground">
                  <BarChart3 className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Performance analytics and ML insights</p>
                </div>
              </CardContent>
            </Card>
            
            <Card className="metro-card">
              <CardHeader>
                <CardTitle>Predictive Maintenance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-muted-foreground">
                  <Activity className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>AI-powered maintenance forecasting</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MetroDashboard;
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Brain, 
  Cpu, 
  Target, 
  TrendingUp, 
  AlertCircle, 
  CheckCircle2,
  Clock,
  Zap,
  BarChart3,
  Settings
} from 'lucide-react';

interface OptimizationResult {
  trainsetId: string;
  action: 'induct' | 'standby' | 'maintenance';
  score: number;
  reasoning: string[];
  constraints: string[];
  timestamp: Date;
}

interface OptimizationMetrics {
  serviceReadiness: number;
  costEfficiency: number;
  brandingCompliance: number;
  maintenanceOptimization: number;
  stablingEfficiency: number;
  overallScore: number;
}

const OptimizationPanel: React.FC = () => {
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [results, setResults] = useState<OptimizationResult[]>([]);
  const [metrics, setMetrics] = useState<OptimizationMetrics | null>(null);
  const [optimizationLogs, setOptimizationLogs] = useState<string[]>([]);

  const runOptimization = async () => {
    setIsOptimizing(true);
    setProgress(0);
    setOptimizationLogs([]);
    
    const logs = [
      "Initializing multi-objective optimization engine...",
      "Loading trainset fitness certificates...",
      "Parsing Maximo job card exports...",
      "Calculating branding exposure requirements...",
      "Analyzing mileage balancing constraints...",
      "Evaluating cleaning schedule availability...",
      "Optimizing stabling bay geometry...",
      "Running constraint satisfaction algorithms...",
      "Applying machine learning predictive models...",
      "Generating ranked induction recommendations...",
      "Validation complete - Solution ready"
    ];
    
    // Simulate optimization process
    for (let i = 0; i < logs.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 800));
      setOptimizationLogs(prev => [...prev, logs[i]]);
      setProgress(((i + 1) / logs.length) * 100);
    }
    
    // Generate mock results
    const mockResults: OptimizationResult[] = Array.from({ length: 25 }, (_, i) => ({
      trainsetId: `KMRL-${String(i + 1).padStart(3, '0')}`,
      action: ['induct', 'standby', 'maintenance'][Math.floor(Math.random() * 3)] as 'induct' | 'standby' | 'maintenance',
      score: Math.floor(Math.random() * 30) + 70,
      reasoning: [
        "All fitness certificates valid",
        "Zero open job cards",
        "High branding priority met",
        "Optimal mileage balance"
      ].slice(0, Math.floor(Math.random() * 4) + 1),
      constraints: [
        "Telecom clearance expires in 6 hours",
        "Scheduled cleaning required",
        "Bay repositioning needed"
      ].slice(0, Math.floor(Math.random() * 3)),
      timestamp: new Date()
    }));
    
    const mockMetrics: OptimizationMetrics = {
      serviceReadiness: Math.floor(Math.random() * 20) + 80,
      costEfficiency: Math.floor(Math.random() * 15) + 85,
      brandingCompliance: Math.floor(Math.random() * 10) + 90,
      maintenanceOptimization: Math.floor(Math.random() * 25) + 75,
      stablingEfficiency: Math.floor(Math.random() * 20) + 80,
      overallScore: Math.floor(Math.random() * 15) + 85
    };
    
    setResults(mockResults);
    setMetrics(mockMetrics);
    setIsOptimizing(false);
  };

  const getActionColor = (action: OptimizationResult['action']) => {
    switch (action) {
      case 'induct': return 'text-success';
      case 'standby': return 'text-info';
      case 'maintenance': return 'text-warning';
    }
  };

  const getActionIcon = (action: OptimizationResult['action']) => {
    switch (action) {
      case 'induct': return CheckCircle2;
      case 'standby': return Clock;
      case 'maintenance': return AlertCircle;
    }
  };

  return (
    <div className="space-y-6">
      {/* Optimization Controls */}
      <Card className="metro-card">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center space-x-2">
              <Brain className="h-5 w-5 text-primary" />
              <span>Multi-Objective Optimization Engine</span>
            </CardTitle>
            
            <Button 
              onClick={runOptimization}
              disabled={isOptimizing}
              className="flex items-center space-x-2"
            >
              <Zap className="h-4 w-4" />
              <span>{isOptimizing ? 'Optimizing...' : 'Run Optimization'}</span>
            </Button>
          </div>
        </CardHeader>
        
        <CardContent>
          {isOptimizing && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Progress</span>
                <span className="text-sm font-medium">{Math.round(progress)}%</span>
              </div>
              <Progress value={progress} className="h-2" />
              
              <ScrollArea className="h-40 w-full border border-border rounded-md p-4 bg-surface">
                <div className="space-y-1 font-mono text-xs">
                  {optimizationLogs.map((log, i) => (
                    <div key={i} className="flex items-center space-x-2">
                      <span className="text-muted-foreground">
                        [{new Date().toLocaleTimeString()}]
                      </span>
                      <span>{log}</span>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </div>
          )}
          
          {!isOptimizing && results.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              <Cpu className="h-16 w-16 mx-auto mb-4 opacity-50" />
              <h3 className="text-lg font-semibold mb-2">Ready for Optimization</h3>
              <p>Click "Run Optimization" to generate intelligent induction recommendations</p>
              <p className="text-sm mt-2">Processing 6 interdependent variables across 25 trainsets</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Optimization Results */}
      {metrics && results.length > 0 && (
        <>
          {/* Performance Metrics */}
          <Card className="metro-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Target className="h-5 w-5 text-primary" />
                <span>Optimization Metrics</span>
              </CardTitle>
            </CardHeader>
            
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Service Readiness</span>
                    <span className="text-sm font-medium">{metrics.serviceReadiness}%</span>
                  </div>
                  <Progress value={metrics.serviceReadiness} className="h-2" />
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Cost Efficiency</span>
                    <span className="text-sm font-medium">{metrics.costEfficiency}%</span>
                  </div>
                  <Progress value={metrics.costEfficiency} className="h-2" />
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Branding Compliance</span>
                    <span className="text-sm font-medium">{metrics.brandingCompliance}%</span>
                  </div>
                  <Progress value={metrics.brandingCompliance} className="h-2" />
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Maintenance Optimization</span>
                    <span className="text-sm font-medium">{metrics.maintenanceOptimization}%</span>
                  </div>
                  <Progress value={metrics.maintenanceOptimization} className="h-2" />
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Stabling Efficiency</span>
                    <span className="text-sm font-medium">{metrics.stablingEfficiency}%</span>
                  </div>
                  <Progress value={metrics.stablingEfficiency} className="h-2" />
                </div>
                
                <div className="space-y-2 border-l border-primary pl-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold">Overall Score</span>
                    <span className="text-lg font-bold text-primary">{metrics.overallScore}%</span>
                  </div>
                  <Progress value={metrics.overallScore} className="h-3" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recommendations */}
          <Card className="metro-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                <span>Optimization Recommendations</span>
              </CardTitle>
            </CardHeader>
            
            <CardContent>
              <Tabs defaultValue="all" className="space-y-4">
                <TabsList className="bg-surface border border-border">
                  <TabsTrigger value="all">All Trainsets</TabsTrigger>
                  <TabsTrigger value="induct">For Induction ({results.filter(r => r.action === 'induct').length})</TabsTrigger>
                  <TabsTrigger value="standby">Standby ({results.filter(r => r.action === 'standby').length})</TabsTrigger>
                  <TabsTrigger value="maintenance">Maintenance ({results.filter(r => r.action === 'maintenance').length})</TabsTrigger>
                </TabsList>
                
                <TabsContent value="all">
                  <ScrollArea className="h-96">
                    <div className="space-y-4">
                      {results
                        .sort((a, b) => b.score - a.score)
                        .map((result) => {
                          const ActionIcon = getActionIcon(result.action);
                          return (
                            <div key={result.trainsetId} className="border border-border rounded-lg p-4 bg-surface">
                              <div className="flex items-center justify-between mb-3">
                                <div className="flex items-center space-x-3">
                                  <ActionIcon className={`h-5 w-5 ${getActionColor(result.action)}`} />
                                  <span className="font-semibold">{result.trainsetId}</span>
                                </div>
                                
                                <div className="flex items-center space-x-3">
                                  <Badge variant={result.action === 'induct' ? 'default' : 'secondary'}>
                                    {result.action.toUpperCase()}
                                  </Badge>
                                  <span className="text-sm font-medium">{result.score}%</span>
                                </div>
                              </div>
                              
                              <div className="space-y-2">
                                <div>
                                  <span className="text-sm font-medium text-success">Reasoning:</span>
                                  <ul className="text-sm text-muted-foreground ml-4 mt-1">
                                    {result.reasoning.map((reason, i) => (
                                      <li key={i}>• {reason}</li>
                                    ))}
                                  </ul>
                                </div>
                                
                                {result.constraints.length > 0 && (
                                  <div>
                                    <span className="text-sm font-medium text-warning">Constraints:</span>
                                    <ul className="text-sm text-muted-foreground ml-4 mt-1">
                                      {result.constraints.map((constraint, i) => (
                                        <li key={i}>• {constraint}</li>
                                      ))}
                                    </ul>
                                  </div>
                                )}
                              </div>
                            </div>
                          );
                        })}
                    </div>
                  </ScrollArea>
                </TabsContent>
                
                <TabsContent value="induct">
                  <ScrollArea className="h-96">
                    <div className="space-y-4">
                      {results
                        .filter(r => r.action === 'induct')
                        .sort((a, b) => b.score - a.score)
                        .map((result) => (
                          <div key={result.trainsetId} className="border border-success rounded-lg p-4 bg-success/5">
                            <div className="flex items-center justify-between mb-2">
                              <span className="font-semibold text-success">{result.trainsetId}</span>
                              <span className="text-sm font-medium">{result.score}%</span>
                            </div>
                            <ul className="text-sm text-muted-foreground">
                              {result.reasoning.map((reason, i) => (
                                <li key={i}>• {reason}</li>
                              ))}
                            </ul>
                          </div>
                        ))}
                    </div>
                  </ScrollArea>
                </TabsContent>
                
                <TabsContent value="standby">
                  <ScrollArea className="h-96">
                    <div className="space-y-4">
                      {results
                        .filter(r => r.action === 'standby')
                        .sort((a, b) => b.score - a.score)
                        .map((result) => (
                          <div key={result.trainsetId} className="border border-info rounded-lg p-4 bg-info/5">
                            <div className="flex items-center justify-between mb-2">
                              <span className="font-semibold text-info">{result.trainsetId}</span>
                              <span className="text-sm font-medium">{result.score}%</span>
                            </div>
                            <ul className="text-sm text-muted-foreground">
                              {result.reasoning.map((reason, i) => (
                                <li key={i}>• {reason}</li>
                              ))}
                            </ul>
                          </div>
                        ))}
                    </div>
                  </ScrollArea>
                </TabsContent>
                
                <TabsContent value="maintenance">
                  <ScrollArea className="h-96">
                    <div className="space-y-4">
                      {results
                        .filter(r => r.action === 'maintenance')
                        .sort((a, b) => b.score - a.score)
                        .map((result) => (
                          <div key={result.trainsetId} className="border border-warning rounded-lg p-4 bg-warning/5">
                            <div className="flex items-center justify-between mb-2">
                              <span className="font-semibold text-warning">{result.trainsetId}</span>
                              <span className="text-sm font-medium">{result.score}%</span>
                            </div>
                            <ul className="text-sm text-muted-foreground">
                              {result.reasoning.map((reason, i) => (
                                <li key={i}>• {reason}</li>
                              ))}
                            </ul>
                          </div>
                        ))}
                    </div>
                  </ScrollArea>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
};

export default OptimizationPanel;
import { useQuery } from '@tanstack/react-query';
import { getMyRegistrations, getMyTransactions } from '@/lib/api';
import Navbar from '@/components/Navbar';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Loader2, LogOut, User } from 'lucide-react';
import NeonButton from '@/components/NeonButton';
import { useNavigate } from 'react-router-dom';

const UserDashboard = () => {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user') || '{}');

    const { data: myRegistrations, isLoading: isLoadingRegs } = useQuery({
        queryKey: ['myRegistrations'],
        queryFn: getMyRegistrations,
    });

    const { data: myTransactions, isLoading: isLoadingTxns } = useQuery({
        queryKey: ['myTransactions'],
        queryFn: getMyTransactions,
    });

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login');
    };

    if (isLoadingRegs || isLoadingTxns) {
        return (
            <div className="flex h-screen items-center justify-center bg-background">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background">
            <Navbar />
            <div className="container mx-auto py-24 px-4">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-4xl font-bold font-display text-primary">My Dashboard</h1>
                        <p className="text-muted-foreground mt-2">Welcome back, {user.username}!</p>
                    </div>
                    <NeonButton variant="outline" onClick={handleLogout} className="gap-2">
                        <LogOut className="h-4 w-4" /> Logout
                    </NeonButton>
                </div>

                <div className="grid gap-6 md:grid-cols-3 mb-8">
                    <Card className="bg-card/50 border-primary/20 md:col-span-1">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <User className="h-5 w-5 text-primary" /> Profile Info
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <div>
                                <span className="text-sm text-muted-foreground">Username:</span>
                                <p className="font-medium">{user.username}</p>
                            </div>
                            <div>
                                <span className="text-sm text-muted-foreground">Role:</span>
                                <p className="font-medium capitalize">{user.role}</p>
                            </div>
                        </CardContent>
                    </Card>

                    <div className="md:col-span-2">
                        <Tabs defaultValue="registrations" className="w-full">
                            <TabsList className="bg-card/50 border border-primary/20">
                                <TabsTrigger value="registrations">My Registrations</TabsTrigger>
                                <TabsTrigger value="transactions">Payment History</TabsTrigger>
                            </TabsList>

                            <TabsContent value="registrations">
                                <Card className="bg-card/50 border-primary/20">
                                    <CardHeader>
                                        <CardTitle>Event Registrations</CardTitle>
                                        <CardDescription>Events you have registered for.</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <Table>
                                            <TableHeader>
                                                <TableRow>
                                                    <TableHead>Event</TableHead>
                                                    <TableHead>Type</TableHead>
                                                    <TableHead>Date</TableHead>
                                                </TableRow>
                                            </TableHeader>
                                            <TableBody>
                                                {myRegistrations?.map((reg: any) => (
                                                    <TableRow key={reg._id}>
                                                        <TableCell className="font-medium">{reg.eventName}</TableCell>
                                                        <TableCell>{reg.type}</TableCell>
                                                        <TableCell>
                                                            {new Date(reg.createdAt).toLocaleDateString()}
                                                        </TableCell>
                                                    </TableRow>
                                                ))}
                                                {(!myRegistrations || myRegistrations.length === 0) && (
                                                    <TableRow>
                                                        <TableCell colSpan={3} className="text-center">No registrations found</TableCell>
                                                    </TableRow>
                                                )}
                                            </TableBody>
                                        </Table>
                                    </CardContent>
                                </Card>
                            </TabsContent>

                            <TabsContent value="transactions">
                                <Card className="bg-card/50 border-primary/20">
                                    <CardHeader>
                                        <CardTitle>Transaction History</CardTitle>
                                        <CardDescription>Your recent payment activities.</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <Table>
                                            <TableHeader>
                                                <TableRow>
                                                    <TableHead>Type</TableHead>
                                                    <TableHead>Status</TableHead>
                                                    <TableHead>Action</TableHead>
                                                    <TableHead className="text-right">Date</TableHead>
                                                </TableRow>
                                            </TableHeader>
                                            <TableBody>
                                                {myTransactions?.map((txn: any) => (
                                                    <TableRow key={txn._id}>
                                                        <TableCell>{txn.type}</TableCell>
                                                        <TableCell>{txn.status}</TableCell>
                                                        <TableCell>{txn.action}</TableCell>
                                                        <TableCell className="text-right">
                                                            {new Date(txn.createdAt).toLocaleDateString()}
                                                        </TableCell>
                                                    </TableRow>
                                                ))}
                                                {(!myTransactions || myTransactions.length === 0) && (
                                                    <TableRow>
                                                        <TableCell colSpan={4} className="text-center">No transactions found</TableCell>
                                                    </TableRow>
                                                )}
                                            </TableBody>
                                        </Table>
                                    </CardContent>
                                </Card>
                            </TabsContent>
                        </Tabs>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserDashboard;

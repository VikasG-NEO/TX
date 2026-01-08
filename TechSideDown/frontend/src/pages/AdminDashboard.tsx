import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getRegistrations, getTransactions } from '@/lib/api';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from 'lucide-react';
import Navbar from '@/components/Navbar';

const AdminDashboard = () => {
    const { data: registrations, isLoading: isLoadingRegs } = useQuery({
        queryKey: ['registrations'],
        queryFn: getRegistrations,
    });

    const { data: transactions, isLoading: isLoadingTxns } = useQuery({
        queryKey: ['transactions'],
        queryFn: getTransactions,
    });

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
                <h1 className="mb-8 text-4xl font-bold font-display text-primary">Admin Dashboard</h1>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
                    <Card className="bg-card/50 border-primary/20">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground">Total Registrations</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-primary">{registrations?.length || 0}</div>
                        </CardContent>
                    </Card>

                    <Card className="bg-card/50 border-primary/20">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground">Total Transactions</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-primary">{transactions?.length || 0}</div>
                        </CardContent>
                    </Card>
                </div>

                <Tabs defaultValue="registrations" className="w-full">
                    <TabsList className="bg-card/50 border border-primary/20">
                        <TabsTrigger value="registrations">Registrations</TabsTrigger>
                        <TabsTrigger value="transactions">Transactions</TabsTrigger>
                    </TabsList>

                    <TabsContent value="registrations">
                        <Card className="bg-card/50 border-primary/20">
                            <CardHeader>
                                <CardTitle>Event Registrations</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Event</TableHead>
                                            <TableHead>Type</TableHead>
                                            <TableHead>Leader/Name</TableHead>
                                            <TableHead>Email</TableHead>
                                            <TableHead>Phone</TableHead>
                                            <TableHead>College</TableHead>
                                            <TableHead className="text-right">Date</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {registrations?.map((reg: any) => (
                                            <TableRow key={reg._id}>
                                                <TableCell className="font-medium">{reg.eventName}</TableCell>
                                                <TableCell>{reg.type}</TableCell>
                                                <TableCell>{reg.leaderName}</TableCell>
                                                <TableCell>{reg.email}</TableCell>
                                                <TableCell>{reg.phone}</TableCell>
                                                <TableCell>{reg.college}</TableCell>
                                                <TableCell className="text-right">
                                                    {new Date(reg.createdAt).toLocaleDateString()}
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                        {(!registrations || registrations.length === 0) && (
                                            <TableRow>
                                                <TableCell colSpan={7} className="text-center">No registrations found</TableCell>
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
                                <CardTitle>Payment Transactions</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Status</TableHead>
                                            <TableHead>Type</TableHead>
                                            <TableHead>Action</TableHead>
                                            <TableHead>Amount</TableHead>
                                            <TableHead className="text-right">Date</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {transactions?.map((txn: any) => (
                                            <TableRow key={txn._id}>
                                                <TableCell>{txn.status}</TableCell>
                                                <TableCell>{txn.type}</TableCell>
                                                <TableCell>{txn.action}</TableCell>
                                                <TableCell>{txn.metadata?.amount || '-'}</TableCell>
                                                <TableCell className="text-right">
                                                    {new Date(txn.createdAt).toLocaleDateString()}
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                        {(!transactions || transactions.length === 0) && (
                                            <TableRow>
                                                <TableCell colSpan={5} className="text-center">No transactions found</TableCell>
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
    );
};

export default AdminDashboard;

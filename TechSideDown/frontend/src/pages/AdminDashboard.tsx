import { useState } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { getRegistrations, getTransactions, createNotification } from '@/lib/api';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Loader2, Send } from 'lucide-react';
import Navbar from '@/components/Navbar';
import NeonButton from '@/components/NeonButton';

const AdminDashboard = () => {
    const { data: registrations, isLoading: isLoadingRegs } = useQuery({
        queryKey: ['registrations'],
        queryFn: getRegistrations,
    });

    const [notificationForm, setNotificationForm] = useState({
        title: '',
        message: '',
        type: 'info',
        recipient: 'all'
    });

    const sendNotification = useMutation({
        mutationFn: createNotification,
        onSuccess: () => {
            alert('Notification sent successfully!');
            setNotificationForm({ title: '', message: '', type: 'info', recipient: 'all' });
        },
        onError: () => alert('Failed to send notification')
    });

    const handleSendNotification = (e: React.FormEvent) => {
        e.preventDefault();
        sendNotification.mutate(notificationForm);
    };

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
                        <TabsTrigger value="notifications">Notifications</TabsTrigger>
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

                    <TabsContent value="notifications">
                        <Card className="bg-card/50 border-primary/20 max-w-2xl mx-auto">
                            <CardHeader>
                                <CardTitle>Send Notification</CardTitle>
                                <CardDescription>Send a message to all users or a specific user.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <form onSubmit={handleSendNotification} className="space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="title">Title</Label>
                                        <Input
                                            id="title"
                                            value={notificationForm.title}
                                            onChange={(e) => setNotificationForm({ ...notificationForm, title: e.target.value })}
                                            placeholder="Notification Title"
                                            required
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="type">Type</Label>
                                        <Select
                                            value={notificationForm.type}
                                            onValueChange={(value) => setNotificationForm({ ...notificationForm, type: value })}
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select type" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="info">Info</SelectItem>
                                                <SelectItem value="success">Success</SelectItem>
                                                <SelectItem value="warning">Warning</SelectItem>
                                                <SelectItem value="error">Error</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="message">Message</Label>
                                        <Textarea
                                            id="message"
                                            value={notificationForm.message}
                                            onChange={(e) => setNotificationForm({ ...notificationForm, message: e.target.value })}
                                            placeholder="Type your message here..."
                                            required
                                            className="min-h-[100px]"
                                        />
                                    </div>
                                    <NeonButton type="submit" disabled={sendNotification.isPending} className="w-full">
                                        {sendNotification.isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Send className="mr-2 h-4 w-4" />}
                                        Send Notification
                                    </NeonButton>
                                </form>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
};

export default AdminDashboard;

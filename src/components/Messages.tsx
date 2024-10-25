import { useState } from "react";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useMessages } from "@/contexts/MessagesContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { format } from "date-fns";
import { Mail, MailOpen, Plus, Send } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";

const Messages = () => {
  const { messages, markAsRead, sendMessage, replyToMessage } = useMessages();
  const { t } = useLanguage();
  const { toast } = useToast();
  const [selectedMessage, setSelectedMessage] = useState<number | null>(null);
  const [newMessageSubject, setNewMessageSubject] = useState("");
  const [newMessageContent, setNewMessageContent] = useState("");
  const [replyContent, setReplyContent] = useState("");
  const [showNewMessageDialog, setShowNewMessageDialog] = useState(false);

  const handleMessageClick = (id: number) => {
    setSelectedMessage(id);
    markAsRead(id);
  };

  const handleSendNewMessage = () => {
    if (!newMessageSubject.trim() || !newMessageContent.trim()) {
      toast({
        title: t('invalidInput'),
        description: t('fillAllFields'),
        variant: "destructive",
      });
      return;
    }

    sendMessage(newMessageSubject, newMessageContent);
    setNewMessageSubject("");
    setNewMessageContent("");
    setShowNewMessageDialog(false);
    toast({
      title: t('messageSent'),
      description: t('messageSentDescription'),
    });
  };

  const handleSendReply = () => {
    if (!replyContent.trim() || !selectedMessage) return;
    replyToMessage(selectedMessage, replyContent);
    setReplyContent("");
    toast({
      title: t('messageSent'),
      description: t('messageSentDescription'),
    });
  };

  const selectedMessageData = messages.find(msg => msg.id === selectedMessage);

  return (
    <div className="grid md:grid-cols-2 gap-4">
      <Card className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">{t('messages')}</h2>
          <Dialog open={showNewMessageDialog} onOpenChange={setShowNewMessageDialog}>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm">
                <Plus className="h-4 w-4 mr-2" />
                {t('newMessage')}
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{t('newMessage')}</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 mt-4">
                <Input
                  placeholder={t('subject')}
                  value={newMessageSubject}
                  onChange={(e) => setNewMessageSubject(e.target.value)}
                />
                <Textarea
                  placeholder={t('messageContent')}
                  value={newMessageContent}
                  onChange={(e) => setNewMessageContent(e.target.value)}
                  rows={5}
                />
                <Button onClick={handleSendNewMessage} className="w-full">
                  <Send className="h-4 w-4 mr-2" />
                  {t('sendMessage')}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
        <ScrollArea className="h-[500px]">
          <div className="space-y-2">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`p-3 rounded-lg cursor-pointer transition-colors ${
                  selectedMessage === message.id
                    ? 'bg-primary/10'
                    : 'hover:bg-secondary'
                }`}
                onClick={() => handleMessageClick(message.id)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {message.isRead ? (
                      <MailOpen className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <Mail className="h-4 w-4 text-primary" />
                    )}
                    <span className="font-medium">{message.subject}</span>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {format(new Date(message.date), 'MMM d, yyyy')}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </Card>

      <Card className="p-4">
        {selectedMessageData ? (
          <div className="space-y-4">
            <div>
              <h3 className="text-xl font-semibold">{selectedMessageData.subject}</h3>
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                <span>{format(new Date(selectedMessageData.date), 'MMMM d, yyyy')}</span>
                <span>•</span>
                <span>{selectedMessageData.fromStaff ? t('fromStaff') : t('fromYou')}</span>
              </div>
              <p className="whitespace-pre-wrap mb-8">{selectedMessageData.content}</p>
            </div>
            <div className="space-y-2">
              <Textarea
                placeholder={t('writeReply')}
                value={replyContent}
                onChange={(e) => setReplyContent(e.target.value)}
                rows={4}
              />
              <Button 
                onClick={handleSendReply}
                disabled={!replyContent.trim()}
                className="w-full"
              >
                <Send className="h-4 w-4 mr-2" />
                {t('sendReply')}
              </Button>
            </div>
          </div>
        ) : (
          <div className="h-full flex items-center justify-center text-muted-foreground">
            {t('selectMessage')}
          </div>
        )}
      </Card>
    </div>
  );
};

export default Messages;
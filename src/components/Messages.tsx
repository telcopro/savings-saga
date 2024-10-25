import { useState } from "react";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useMessages } from "@/contexts/MessagesContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { format } from "date-fns";
import { Mail, MailOpen } from "lucide-react";

const Messages = () => {
  const { messages, markAsRead } = useMessages();
  const { t } = useLanguage();
  const [selectedMessage, setSelectedMessage] = useState<number | null>(null);

  const handleMessageClick = (id: number) => {
    setSelectedMessage(id);
    markAsRead(id);
  };

  const selectedMessageData = messages.find(msg => msg.id === selectedMessage);

  return (
    <div className="grid md:grid-cols-2 gap-4">
      <Card className="p-4">
        <h2 className="text-xl font-semibold mb-4">{t('messages')}</h2>
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
          <div>
            <h3 className="text-xl font-semibold mb-2">{selectedMessageData.subject}</h3>
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
              <span>{format(new Date(selectedMessageData.date), 'MMMM d, yyyy')}</span>
              <span>•</span>
              <span>{selectedMessageData.fromStaff ? t('fromStaff') : t('fromYou')}</span>
            </div>
            <p className="whitespace-pre-wrap">{selectedMessageData.content}</p>
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
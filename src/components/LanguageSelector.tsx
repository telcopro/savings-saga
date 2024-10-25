import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { Languages } from "lucide-react";

const LanguageSelector = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center gap-2">
      <Languages className="h-4 w-4 text-muted-foreground" />
      <div className="flex gap-1">
        <Button
          variant={language === 'en' ? 'secondary' : 'ghost'}
          size="sm"
          onClick={() => setLanguage('en')}
        >
          EN
        </Button>
        <Button
          variant={language === 'sv' ? 'secondary' : 'ghost'}
          size="sm"
          onClick={() => setLanguage('sv')}
        >
          SV
        </Button>
      </div>
    </div>
  );
};

export default LanguageSelector;
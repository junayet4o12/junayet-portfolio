import { Dispatch, SetStateAction, useState } from "react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
// No React Quill import needed
import {
    Plus,
    Trash2
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
const languageProficiencyLevels = [
    "Native",
    "Fluent",
    "Advanced",
    "Intermediate",
    "Basic"
];
type Language = {
    name: string;
    level: string;
};

type PropsType = {
    languages: Language[];
    setLanguages: Dispatch<SetStateAction<Language[]>>;
}
export default function AFCLanguages({ languages, setLanguages }: PropsType) {
    const [newLanguage, setNewLanguage] = useState<string>("");
    const [newLanguageLevel, setNewLanguageLevel] = useState<string>("Intermediate");
    const [editingLanguageIndex, setEditingLanguageIndex] = useState<number | null>(null);
    const [editLanguageName, setEditLanguageName] = useState<string>("");
    const [editLanguageLevel, setEditLanguageLevel] = useState<string>("");
    // Add a new language
    const addLanguage = () => {
        if (newLanguage.trim() !== "") {
            setLanguages([...languages, { name: newLanguage, level: newLanguageLevel }]);
            setNewLanguage("");
            setNewLanguageLevel("Intermediate");
        }
    };
    // Edit an existing language
    const startEditingLanguage = (index: number) => {
        setEditingLanguageIndex(index);
        setEditLanguageName(languages[index].name);
        setEditLanguageLevel(languages[index].level);
    };

    // Save edited language
    const saveEditedLanguage = () => {
        if (editingLanguageIndex !== null && editLanguageName.trim() !== "") {
            const updatedLanguages = [...languages];
            updatedLanguages[editingLanguageIndex] = {
                name: editLanguageName,
                level: editLanguageLevel
            };
            setLanguages(updatedLanguages);
            setEditingLanguageIndex(null);
        }
    };

    // Cancel editing
    const cancelEditingLanguage = () => {
        setEditingLanguageIndex(null);
    };

    // Remove a language
    const removeLanguage = (index: number) => {
        const updatedLanguages = [...languages];
        updatedLanguages.splice(index, 1);
        setLanguages(updatedLanguages);
    };
    return (
        <div className="space-y-4">
            <h3 className="text-lg font-medium">Languages</h3>

            {/* Language List */}
            <div className="space-y-2">
                {languages.length > 0 ? (
                    <div className="space-y-2">
                        {languages.map((lang, index) => (
                            <div key={index} className="flex items-center justify-between bg-background/70 border border-border p-3 rounded-xl">
                                {editingLanguageIndex === index ? (
                                    <div className="flex-1 flex gap-2">
                                        <Input
                                            value={editLanguageName}
                                            onChange={(e) => setEditLanguageName(e.target.value)}
                                            className="h-9 bg-background/50"
                                        />
                                        <Select
                                            value={editLanguageLevel}
                                            onValueChange={setEditLanguageLevel}
                                        >
                                            <SelectTrigger className="h-9 bg-background/50 w-32">
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {languageProficiencyLevels.map((level) => (
                                                    <SelectItem key={level} value={level}>
                                                        {level}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <div className="flex gap-1">
                                            <Button
                                                type="button"
                                                variant="outline"
                                                size="sm"
                                                onClick={saveEditedLanguage}
                                            >
                                                Save
                                            </Button>
                                            <Button
                                                type="button"
                                                variant="ghost"
                                                size="sm"
                                                onClick={cancelEditingLanguage}
                                            >
                                                Cancel
                                            </Button>
                                        </div>
                                    </div>
                                ) : (
                                    <>
                                        <div>
                                            <span className="font-medium">{lang.name}</span>
                                            <span className="text-sm text-muted-foreground ml-2">({lang.level})</span>
                                        </div>
                                        <div>
                                            <Button
                                                type="button"
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => startEditingLanguage(index)}
                                                className="mr-1"
                                            >
                                                Edit
                                            </Button>
                                            <Button
                                                type="button"
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => removeLanguage(index)}
                                            >
                                                <Trash2 size={16} className="text-destructive" />
                                            </Button>
                                        </div>
                                    </>
                                )}
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-sm text-muted-foreground">No languages added yet.</p>
                )}
            </div>

            {/* Add Language Form */}
            <div className="grid md:grid-cols-3 gap-2">
                <div className="md:col-span-1 space-y-2">
                    <Label htmlFor="language-name">Language</Label>
                    <Input
                        id="language-name"
                        value={newLanguage}
                        onChange={(e) => setNewLanguage(e.target.value)}
                        placeholder="English"
                        className="h-12 bg-background/50 border-border focus-visible:border-primary/50 rounded-xl"
                    />
                </div>
                <div className="md:col-span-1 space-y-2">
                    <Label htmlFor="language-level">Proficiency</Label>
                    <Select
                        value={newLanguageLevel}
                        onValueChange={setNewLanguageLevel}
                    >
                        <SelectTrigger className="h-12 bg-background/50 border-border focus-visible:border-primary/50 rounded-xl">
                            <SelectValue placeholder="Select level" />
                        </SelectTrigger>
                        <SelectContent>
                            {languageProficiencyLevels.map((level) => (
                                <SelectItem key={level} value={level}>
                                    {level}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                <div className="md:col-span-1 flex items-end">
                    <Button
                        type="button"
                        onClick={addLanguage}
                        disabled={!newLanguage.trim()}
                        className="w-full h-12 rounded-xl"
                    >
                        <Plus size={16} className="mr-2" />
                        Add Language
                    </Button>
                </div>
            </div>
        </div>
    );
}
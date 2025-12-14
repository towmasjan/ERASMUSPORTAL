'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  FileText, 
  Upload, 
  Download,
  Folder,
  File,
  Image,
  FileSpreadsheet,
} from 'lucide-react';

const folders = [
  { name: 'Grant Agreements', count: 3, icon: Folder },
  { name: 'Participant Forms', count: 12, icon: Folder },
  { name: 'Travel Documents', count: 8, icon: Folder },
  { name: 'Event Photos', count: 45, icon: Image },
];

const recentFiles = [
  { name: 'Grant_Agreement_2024.pdf', size: '2.4 MB', date: 'Dec 10, 2024', type: 'pdf' },
  { name: 'Participant_List.xlsx', size: '156 KB', date: 'Dec 9, 2024', type: 'excel' },
  { name: 'Travel_Reimbursement_Form.pdf', size: '89 KB', date: 'Dec 8, 2024', type: 'pdf' },
  { name: 'Event_Schedule.docx', size: '234 KB', date: 'Dec 7, 2024', type: 'doc' },
];

function getFileIcon(type: string) {
  switch (type) {
    case 'excel':
      return <FileSpreadsheet className="w-5 h-5 text-emerald-600" />;
    case 'image':
      return <Image className="w-5 h-5 text-violet-600" />;
    default:
      return <File className="w-5 h-5 text-primary" />;
  }
}

export default function DocumentsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-3">
            <FileText className="w-8 h-8 text-primary" />
            Documents
          </h1>
          <p className="text-muted-foreground mt-1">
            Store and manage project documents and files
          </p>
        </div>
        <Button className="bg-primary hover:bg-primary/90">
          <Upload className="w-4 h-4 mr-2" />
          Upload Document
        </Button>
      </div>

      {/* Folders Grid */}
      <div className="grid gap-4 md:grid-cols-4">
        {folders.map((folder) => (
          <Card key={folder.name} className="cursor-pointer hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-secondary/20 flex items-center justify-center">
                  <folder.icon className="w-5 h-5 text-secondary" />
                </div>
                <div>
                  <h3 className="font-medium text-sm">{folder.name}</h3>
                  <p className="text-xs text-muted-foreground">{folder.count} files</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Files */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Files</CardTitle>
          <CardDescription>Recently uploaded or modified documents</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentFiles.map((file) => (
              <div
                key={file.name}
                className="flex items-center gap-4 p-3 rounded-lg hover:bg-muted/50 transition-colors group"
              >
                <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                  {getFileIcon(file.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-sm truncate">{file.name}</h4>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span>{file.size}</span>
                    <span>•</span>
                    <span>{file.date}</span>
                  </div>
                </div>
                <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100 transition-opacity">
                  <Download className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}


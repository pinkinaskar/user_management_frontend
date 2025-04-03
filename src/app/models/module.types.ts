export interface Module
{
    module: string;
    path: string;
    title: string;
    icon: string;
    class: string | null;
    access: boolean;
    // disable: boolean;
}

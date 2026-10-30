import os
import zipfile

def zip_project(output_filename, source_dir):
    exclude_dirs = {
        'node_modules', '.output', '.wrangler', '.tanstack', 
        '.nitro', '.git', '.vercel', 'dist'
    }
    exclude_files = {output_filename, 'ograai-project.tar.gz'}

    with zipfile.ZipFile(output_filename, 'w', zipfile.ZIP_DEFLATED) as zipf:
        for root, dirs, files in os.walk(source_dir):
            # Prune excluded directories
            dirs[:] = [d for d in dirs if d not in exclude_dirs]
            
            for file in files:
                if file in exclude_files:
                    continue
                
                full_path = os.path.join(root, file)
                rel_path = os.path.relpath(full_path, source_dir)
                zipf.write(full_path, rel_path)

if __name__ == '__main__':
    zip_project('public/ograai-project.zip', '.')
    print("Project zipped successfully to public/ograai-project.zip")

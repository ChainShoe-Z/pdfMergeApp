import os
from PyPDF2 import PdfMerger

def merge_pdfs(output_path, *input_paths):
    merger = PdfMerger()
    
    for path in input_paths:
        merger.append(path)
    
    merger.write(output_path)
    merger.close()

# 设置输入文件和输出文件的路径
output_path = 'merged.pdf'
input_paths = ['resume_ChengxuZhang.pdf', 'Reference Letter - Chengxu Zhang.pdf']

# 调用合并函数
merge_pdfs(output_path, *input_paths)

print('PDF merged successfully！')

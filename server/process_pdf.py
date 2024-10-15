from pdf2docx import Converter
import sys
def pdf_to_docx(pdf_file, docx_file):
    cv = Converter(pdf_file)
    cv.convert(docx_file, start=0, end=None)
    cv.close()

if __name__ == "__main__":
    # コマンドライン引数からPDFファイルと出力先のWordファイルのパスを取得
    if len(sys.argv) != 3:
        print("使い方: python pdf_to_docx.py <PDFファイルパス> <Wordファイルパス>")
        sys.exit(1)

    pdf_file = sys.argv[1]
    docx_file = sys.argv[2]
    
    # PDFをWordに変換
    pdf_to_docx(pdf_file, docx_file)
    print("変換が完了しました。")
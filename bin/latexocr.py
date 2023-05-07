import sys
from PIL import Image
from pix2tex.cli import LatexOCR

def main(image_path):
    img = Image.open(image_path)
    model = LatexOCR()
    latex_code = model(img)
    print(latex_code)

if __name__ == '__main__':
    main(sys.argv[1])
"""Import selected generated art and make compact, responsive local assets."""
from pathlib import Path
from PIL import Image
import hashlib
import json
import shutil

ROOT=Path(__file__).resolve().parents[1]
generated=Path('C:/Users/12782/.codex/generated_images/01a1be1b-c35b-7c50-92f1-2058e2a5079b')
originals=ROOT/'outputs/comic-originals'
target=ROOT/'public/slides/assets/comics'
target.mkdir(parents=True,exist_ok=True);originals.mkdir(parents=True,exist_ok=True)
jobs=[('personal-explanation','exec-fb991ba8-226a-4589-bdbf-709ff2c19dea.png'),('verify-ai','exec-0e26f49c-5bda-4a76-8ad6-e08bda5a141f.png')]
assets=[]
for slug,name in jobs:
    source=generated/name
    if not source.exists():
        if (target/(slug+'.webp')).exists():continue
        raise FileNotFoundError(source)
    shutil.copy2(source,originals/(slug+'.png'))
    image=Image.open(source).convert('RGB')
    image.save(target/(slug+'.webp'),'WEBP',quality=86,method=6)
    for index in range(4):
        tile=image.crop((round(image.width*index/4),0,round(image.width*(index+1)/4),image.height))
        tile.save(target/(slug+'-'+str(index+1)+'.webp'),'WEBP',quality=86,method=6)
    assets.append({'slug':slug,'sourceSha256':hashlib.sha256(source.read_bytes()).hexdigest(),'width':image.width,'height':image.height,'panelCount':4,'panelBytes':sum((target/(slug+'-'+str(i)+'.webp')).stat().st_size for i in range(1,5)),'fullBytes':(target/(slug+'.webp')).stat().st_size})
(target/'manifest.json').write_text(json.dumps({'generator':'built-in image_gen','assets':assets},ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
print(json.dumps(assets))

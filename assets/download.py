from google_images_download import google_images_download
import os
import csv

uniqueword = []
nodownload = []
limit = 1
outdir = './images/'

with open('uniquewords.csv','rt')as f:
  data = csv.reader(f)
  for row in data:
        uniqueword.append(row[0])

print(len(uniqueword))

for word in uniqueword:
    response = google_images_download.googleimagesdownload()
    absolute_image_paths = response.download({
        'keywords':word,
        'limit':limit,
        'output_directory': outdir,
        'no_directory': True,
    })
    # print(absolute_image_paths)
    extension = absolute_image_paths[word][0].split('.')[-1]
    full_img_path = absolute_image_paths[word][0].split('\\')
    full_img_path[-1] = word + '.' + extension
    try:
        os.rename(absolute_image_paths[word][0], '\\'.join(full_img_path))
    except:
        print(absolute_image_paths[word][0])
        nodownload.append(word)

for word in nodownload:
    print(word)



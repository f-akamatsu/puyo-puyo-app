import os
import glob
from grpc_tools import protoc

PROTO_SRC = '../../packages/protos'
OUTPUT_DIR = 'src/generated'

def main():
  os.makedirs(OUTPUT_DIR, exist_ok=True)

  protos = glob.glob(f'{PROTO_SRC}/**/*.proto', recursive=True)

  protoc.main(
    (
      '',
      f'-I{PROTO_SRC}',
      f'--python_out={OUTPUT_DIR}',
      f'--grpc_python_out={OUTPUT_DIR}',
      *protos
    )
  )

if __name__ == '__main__':
  main()

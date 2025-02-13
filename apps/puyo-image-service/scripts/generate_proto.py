import os
import subprocess

PROTO_SRC = "../../packages/protos"
OUTPUT_DIR = "generated"

def main():
  os.makedirs(OUTPUT_DIR, exist_ok=True)
  command = [
    "python", "-m", "grpc_tools.protoc",
    f"-I{PROTO_SRC}",
    f"--python_out={OUTPUT_DIR}",
    f"--grpc_python_out={OUTPUT_DIR}",
    f"{PROTO_SRC}/apis/puyo-image/puyo_image.proto"
  ]
  subprocess.run(command, check=True)

if __name__ == "__main__":
  main()

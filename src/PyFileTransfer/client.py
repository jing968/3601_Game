import socket
import os

SEPARATOR = "<SEPARATOR>"
BUFFER_SIZE = 4096 # send 4096 bytes each time step

# the ip address or hostname of the server, the receiver
host = "127.0.0.1"
# the port, let's use 5001
port = 5001
# the name of file we want to send, make sure it exists
filename = "../Assets/data.txt"
# get the file size
filesize = os.path.getsize(filename)
print(filesize)

# create the client socket
s = socket.socket()


print(f"[+] Connecting to {host}:{port}")
s.connect((host, port))
print("[+] Connected.")

# send the filename and filesize
s.send(f"{filename}{SEPARATOR}{filesize}".encode())

with open(filename, "rb") as f:
    while True:
        # read the bytes from the file
        bytes_read = f.read(BUFFER_SIZE)
        if not bytes_read:
            # file transmitting is done
            break
        # we use sendall to assure transimission in 
        # busy networks
        s.sendall(bytes_read)
# close the socket
s.close()
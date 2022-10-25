class Node(object):
  
    def __init__(self, val):
        self.val = val
        self.next = None
        self.prev = None
        
    def get_data(self):
        return self.val
      
    def set_data(self, val):
        self.val = val
 
    def get_next(self):
        return self.next
 
    def set_next(self, next):
        self.next = next

    def get_prev(self):
        return self.prev 
      
    def set_prev(self, prev):
        self.prev = prev
 
class LinkedList(object):

        # constructor
    def __init__(self):
        self.head = None
        self.tail = None

    def nodeInsetail (key):
        global head
        global tail 

        p = Node(0)
        p.info = key
        p.next = None

        if ((head) == None):
            (head) = p
            (tail) = p 
            (head).prev = None
            return
        if ((p.info) < ((head).info)):
            p.prev = None
            (head).prev = p
            p.next = (head)
            (head) = p
            return
        if ((p.info) > ((tail).info)):
            p.prev = (tail)
            (tail).next = p
            (tail) = p
            return
        # menemukan node sebelum memasukkan nilai p
        temp = (head).next
        while ((temp.info) < (p.info)):
            temmp = temp.next
        
        # memasukkan new node sebelum temp
        (temp.prev).next = p
        p.prev = temp.prev
        temp.prev = p
        p.next = temp
        
    def get_length(self):
        # return length dari Linked list
        return self.length
      
    def is_empty(self):
        #we only have to check the head if is None or not
        return self.head == None    
        
        # menambah node baru di head
    def add(self, value):
        node = Node(value)
        if (self.head == None) :
            self.head = node
            self.tail = node
        else :
            node.set_prev(self.tail)
            self.tail.set_next(node)
            self.tail = node

        # else:
        #     n = self.head
        #     while n.get_next() != None:
        #         n = n.get_next()
        #     n.set_next(new_node)
        # self.length+=1
        
        # menambah value berdasarkan index
    def insert(self,value,index):
        if index == 0:
            self.add(value)
        else:
            count=1
            n=self.head
            while count<index and n!=None:
                n=n.get_next()
                count+=1
            
            # mengecek apakah index ada
            if n == None:
                print("index yang dimasukkan melebihi panjang LinkedList")
            else:
                new_node=Node(value)
                new_node.set_next(n.get_next())
                n.set_next(new_node)

        # menghapus node berdasarkan index
    def remove(self, index):
        if index == 0:
            self.head = self.head.get_next()
        else:
            count=1
            n=self.head
            while count<index and n!=None:
                n=n.get_next()
                count+=1
            if n.get_next() == None:
                print("index yang dimasukkan melebihi panjang LinkedList")
            else:
                n.set_next(n.get_next().get_next())
        
        # menukar value dari dua index
    def swap(self, index1, index2):
        current1 = self.get(index1)
        current2 = self.get(index2)

        if(current1 == self.head):
            self.head = current2
        elif (current2 == self.head):
            self.head = current1

        if (current1 == self.tail):
            self.tail = current2
        elif (current2 == self.tail):
            self.tail = current1

        current1Next = current1.get_next();
        current1.set_next(current2.get_next());
        current2.set_next(current1Next);

        if (current1.get_next()):
            current1.get_next().set_prev(current1)

        if (current2.get_next()):
            current2.get_next().set_prev(current2)

        current1Prev = current1.get_prev()
        current1.set_prev(current2.get_prev())
        current2.set_prev(current1Prev)

        if (current1.get_prev()):
            current1.get_prev().set_next(current1)

        if (current2.get_next()):
            current2.get_prev().set_next(current2)
                
    # mendapatkan value dari index tertentu                  
    def getLL(self, index):
        current = self.head
        i = 0
        try:
            while (i < index):
                current = current.get_next()
                i = i + 1
        except AttributeError:
            return None
        return current.get_data()

    def get(self, index):
        current = self.head
        i = 0
        try:
            while (i < index):
                current = current.get_next()
                i = i + 1
        except AttributeError:
            return None
        return current
        
        # print seluruh linked list
    # def printLL(self, node):
    #     # set current dengan head, berhenti apabila next node = null
    #     current = self.head
    #     while(current):
    #         print(current.val, "--->", end=" ")
    #         current = current.next

    def printLL(self) :
        temp = self.head
        print("LinkedList = ", end="")
        while (temp != None):
            print(temp.get_data(), end = " ")
            temp = temp.get_next()
        print("")

first = LinkedList()
first.add(1)
first.add(2)
first.add(3)
first.add(4)
first.add(5)
first.add(6)
first.add(7)
first.add(8)

first.printLL()
print("index 2: ", first.getLL(2))
first.remove(0)
first.printLL()
print("remove index 0, index 2 baru: ", first.getLL(2))
first.insert(100, 2)
first.printLL()
print("insert 100 ke index 2")
first.swap(2, 1)
first.printLL()
print("swap index 2 dan 1")
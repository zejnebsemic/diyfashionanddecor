//
// Created by aldin on 18/03/2025.
//

#ifndef XORLINKEDLIST_TPP
#define XORLINKEDLIST_TPP

#include <cstdint>
#include <iterator>

/**
 * These methods are already implemented for you.
 */
template<typename Data>
Node<Data>* ptr_xor(Node<Data> *p, Node<Data> *q) {
    return reinterpret_cast<Node<Data>*>(reinterpret_cast<uintptr_t>(p) ^ reinterpret_cast<uintptr_t>(q));
}

template<typename Data>
Node<Data> *XorLinkedList<Data>::get_head() const {
    return head;
}


/**
 * Your implementations below this comment.
 */

template<typename Data>
XorLinkedList<Data>::~XorLinkedList() {
    // your code
    Node<Data>* curr = head;
    Node<Data>* prev = nullptr;
    while (curr) {
        Node<Data>* next = ptr_xor(prev, curr->both);
        delete curr;
        prev = curr;
        curr = next;
    }
    head = nullptr;
    size = 0;

}

template<typename Data>
XorLinkedList<Data>::XorLinkedList(const XorLinkedList<Data> &src) {
    // your code
    head = nullptr;
    size = 0;
    Node<Data>* curr = src.head;
    Node<Data>* prev = nullptr;
    while (curr) {
        add_to_back(curr->data);
        Node<Data>* next = ptr_xor(prev, curr->both);
        prev = curr;
        curr = next;
    }
}

template<typename Data>
XorLinkedList<Data> &XorLinkedList<Data>::operator=(const XorLinkedList<Data> &src) {
    // your code
    if (this != &src) {
        this->~XorLinkedList();
        Node<Data>* curr = src.head;
        Node<Data>* prev = nullptr;
        while (curr) {
            add_to_back(curr->data);
            Node<Data>* next = ptr_xor(prev, curr->both);
            prev = curr;
            curr = next;
        }
    }
    return *this;
}

template<typename Data>
XorLinkedList<Data>::XorLinkedList(XorLinkedList<Data> &&src) noexcept {
    // your code
    head = src.head;
    size = src.size;
    src.head = nullptr;
    src.size = 0;
}

template<typename Data>
XorLinkedList<Data> &XorLinkedList<Data>::operator=(XorLinkedList<Data> &&src) noexcept {
    // your code
    if (this != &src) {
        this->~XorLinkedList();
        head = src.head;
        size = src.size;
        src.head = nullptr;
        src.size = 0;
    }
    return *this;
}

template<typename Data>
XorLinkedList<Data>::XorLinkedList(std::initializer_list<Data> list) {
    // your code
    head = nullptr;
    size = 0;
    for (const auto& item : list) {
        add_to_back(item);
    }
}

template<typename Data>
void XorLinkedList<Data>::add_to_front(const Data &data) {
    // your code
    Node<Data>* new_node = new Node<Data>{data, head};
    if (head) {
        Node<Data>* next = ptr_xor(static_cast<Node<Data>*>(nullptr), head->both);
        head->both = ptr_xor(new_node, next);
    }
    head = new_node;
    size++;
}

template<typename Data>
void XorLinkedList<Data>::add_to_back(const Data &data) {
    // your code
    if (!head) {
        add_to_front(data);
        return;
    }
    Node<Data>* prev = nullptr;
    Node<Data>* curr = head;
    Node<Data>* next;
    while ((next = ptr_xor(prev, curr->both))) {
        prev = curr;
        curr = next;
    }
    Node<Data>* new_node = new Node<Data>{data, curr};
    curr->both = ptr_xor(prev, new_node);
    size++;
}

template<typename Data>
void XorLinkedList<Data>::remove_from_front() {
    // your code
    if (!head) throw std::out_of_range("List is empty");
    Node<Data>* next = ptr_xor(static_cast<Node<Data>*>(nullptr), head->both);
    if (next) {
        Node<Data>* next_next = ptr_xor(head, next->both);
        next->both = next_next;
    }
    delete head;
    head = next;
    size--;
}

template<typename Data>
void XorLinkedList<Data>::remove_from_back() {
    // your code
    if (!head) throw std::out_of_range("List is empty");
    Node<Data>* prev = nullptr;
    Node<Data>* curr = head;
    Node<Data>* next;
    while ((next = ptr_xor(prev, curr->both))) {
        prev = curr;
        curr = next;
    }
    if (!prev) {
        delete head;
        head = nullptr;
    } else {
        Node<Data>* prev_prev = ptr_xor(curr, prev->both);
        prev->both = prev_prev;
        delete curr;
    }
    size--;
}

template<typename Data>
Data &XorLinkedList<Data>::get(int index) {
    // your code
    if (index < 0 || index >= size) throw std::out_of_range("Index out of bounds");
    Node<Data>* prev = nullptr;
    Node<Data>* curr = head;
    for (int i = 0; i < index; i++) {
        Node<Data>* next = ptr_xor(prev, curr->both);
        prev = curr;
        curr = next;
    }
    return curr->data;
}

template<typename Data>
int XorLinkedList<Data>::count() const {
    // your code
    return size;
}

template<typename Data>
void XorLinkedList<Data>::reverse() {
    // your code
    Node<Data>* prev = nullptr;
    Node<Data>* curr = head;
    Node<Data>* next;
    while (curr) {
        next = ptr_xor(prev, curr->both);
        curr->both = ptr_xor(next, prev);
        prev = curr;
        curr = next;
    }
    head = prev;
}

template <typename Data>
class XorLinkedList<Data>::Iterator : public std::iterator<std::forward_iterator_tag, Data> {
public:
    using iterator_category = std::forward_iterator_tag;
    using value_type = Data;
    using difference_type = std::ptrdiff_t;
    using pointer = Data*;
    using reference = Data&;
private:
    Node<Data>* current;
    Node<Data>* prev = nullptr;
public:
    explicit Iterator(Node<Data>* current) : current(current) {}

    Data& operator*() {
        // your code
        return current->data;
    }
    Iterator& operator++() {
        // your code
        Node<Data>* next = ptr_xor(prev, current->both);
        prev = current;
        current = next;
        return *this;
    }

    Iterator operator++(int) {
        // your code
        Iterator tmp = *this;
        ++(*this);
        return tmp;
    }

    bool operator==(const Iterator& other) const {
        // your code
        return current == other.current;
    }

    bool operator!=(const Iterator& other) const {
        // your code
        return current != other.current;
    }
};

template<typename Data>
typename XorLinkedList<Data>::Iterator XorLinkedList<Data>::begin() {
    // your code
    return Iterator(head);
}

template<typename Data>
typename XorLinkedList<Data>::Iterator XorLinkedList<Data>::end() {
    // your code
    return Iterator(nullptr);
}

template<typename Data>
const Data& XorLinkedList<Data>::operator[](int index) const {
    // your code
    return const_cast<XorLinkedList*>(this)->get(index);
}

template<typename Data>
Data& XorLinkedList<Data>::operator[](const int index) {
    // your code
    return get(index);
}

#endif //XORLINKEDLIST_TPP

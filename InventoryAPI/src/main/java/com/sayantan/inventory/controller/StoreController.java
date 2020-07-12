package com.sayantan.inventory.controller;

import com.sayantan.inventory.domain.Store;
import com.sayantan.inventory.repository.StoreRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api")
@Slf4j
@CrossOrigin(origins = "http://localhost:4200")
public class StoreController {

    @Autowired
    private StoreRepository storeRepository;

    @GetMapping("/stores")
    public ResponseEntity<List<Store>> getAllBooks() {

        try {
            List<Store> storeList = getAll();
            if (storeList.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }

            log.info("Store result : {}", storeList);
            return new ResponseEntity<>(storeList, HttpStatus.OK);
        } catch (Exception exception) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/stores/{id}")
    public ResponseEntity<Store> getStoreById(@PathVariable("id") int id) {
        Optional<Store> store = storeRepository.findById(id);

        if (store.isPresent()) {
            return new ResponseEntity<>(store.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/stores")
    public ResponseEntity<List<Store>> createStore(@RequestBody Store store) {
        try {
            storeRepository.save(store);

            return new ResponseEntity<>(getAll(), HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.EXPECTATION_FAILED);
        }
    }

    @PutMapping("/stores/{id}")
    public ResponseEntity<List<Store>> updateStore(@PathVariable("id") int id, @RequestBody Store store) {
        Optional<Store> storeData = storeRepository.findById(id);

        if (storeData.isPresent()) {
            storeRepository.save(store);
            return new ResponseEntity<>(getAll(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/stores/{id}")
    public ResponseEntity<List<Store>> deleteStore(@PathVariable("id") int id) {
        try {
            storeRepository.deleteById(id);
            return new ResponseEntity<>(getAll(), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.EXPECTATION_FAILED);
        }
    }

    @DeleteMapping("/stores")
    public ResponseEntity<List<Store>> deleteAllStores() {
        try {
            storeRepository.deleteAll();
            return new ResponseEntity<>(getAll(), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.EXPECTATION_FAILED);
        }
    }

    private List<Store> getAll() {
        List<Store> storeList = new ArrayList<Store>();
        storeRepository.findAll().forEach(storeList::add);

        return storeList;
    }
}

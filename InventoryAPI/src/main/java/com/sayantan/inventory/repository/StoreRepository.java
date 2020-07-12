package com.sayantan.inventory.repository;

import com.sayantan.inventory.domain.Store;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StoreRepository extends PagingAndSortingRepository<Store, Integer> {
}

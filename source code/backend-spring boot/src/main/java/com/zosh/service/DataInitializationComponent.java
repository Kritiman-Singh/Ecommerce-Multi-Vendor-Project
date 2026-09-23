package com.zosh.services.impl;


import com.zosh.domain.AccountStatus;
import com.zosh.domain.USER_ROLE;
import com.zosh.model.Seller;
import com.zosh.model.User;
import com.zosh.repository.SellerRepository;
import com.zosh.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class DataInitializationComponent implements CommandLineRunner {

    private final UserRepository userRepository;
    private final SellerRepository sellerRepository;
    private final PasswordEncoder passwordEncoder;



    @Override
    public void run(String... args) {
        initializeAdminUser();
        initializeStoreSeller();
    }

    private void initializeAdminUser() {
        String adminUsername = "kritimansingh123@gmail.com";

        if (userRepository.findByEmail(adminUsername)==null) {
            User adminUser = new User();

            adminUser.setPassword(passwordEncoder.encode("codewithzosh"));
            adminUser.setFullName("Zosh");
            adminUser.setEmail(adminUsername);
            adminUser.setRole(USER_ROLE.ROLE_ADMIN);

            User admin=userRepository.save(adminUser);
        }
    }

    /**
     * System seller that owns every product created from the admin panel,
     * so admin products use the same storefront/cart/order flow as sellers.
     * Migrates the legacy store row (if any) to the new branding.
     */
    private void initializeStoreSeller() {
        String storeEmail = "store@zentro.com";
        String legacyEmail = "store@zoshbazaar.com";

        Seller storeSeller = sellerRepository.findByEmail(storeEmail);
        if (storeSeller == null) {
            storeSeller = sellerRepository.findByEmail(legacyEmail);
        }

        if (storeSeller==null) {
            storeSeller = new Seller();
            storeSeller.setEmail(storeEmail);
            storeSeller.setMobile("9000000000");
            storeSeller.setPassword(passwordEncoder.encode("store123"));
            storeSeller.setRole(USER_ROLE.ROLE_SELLER);
            storeSeller.setEmailVerified(true);
            storeSeller.setAccountStatus(AccountStatus.ACTIVE);
        }

        // Always enforce current branding (covers legacy rows too).
        storeSeller.setEmail(storeEmail);
        storeSeller.setSellerName("Zentro Store");
        storeSeller.getBusinessDetails().setBusinessName("Zentro Official Store");

        sellerRepository.save(storeSeller);
    }

}